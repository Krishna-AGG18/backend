import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiErrors } from "../utils/api-errors.js";
import { Project } from "../models/project.models.js";
import mongoose from "mongoose";
import { ProjectMember } from "../models/projectmember.models.js";
import { Task } from "../models/task.models.js";
import { SubTask } from "../models/subtask.models.js";
import { ProjectNote } from "../models/note.models.js";
import { Activity } from "../models/activity.models.js";
import { Notification } from "../models/notification.models.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import { logActivity } from "./activity.controllers.js";
import { createNotification } from "./notification.controllers.js";

const createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const project = await Project.create({
        name: name,
        description: description,
        status: req.body.status,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
        taskStatuses: [
            { name: "todo", category: "todo" },
            { name: "in_progress", category: "in_progress" },
            { name: "done", category: "done" }
        ],
        taskPriorities: [
            { name: "low", level: 1 },
            { name: "medium", level: 2 },
            { name: "high", level: 3 }
        ],
        customRoles: [
            { name: "admin", permissions: ["manage_project", "manage_members", "create_task", "update_task", "delete_task", "manage_notes"] },
            { name: "project_admin", permissions: ["manage_members", "create_task", "update_task", "delete_task", "manage_notes"] },
            { name: "member", permissions: ["update_task"] }
        ],
        createdBy: new mongoose.Types.ObjectId(req.user._id),
    });

    await ProjectMember.create({
        user: new mongoose.Types.ObjectId(req.user._id),
        project: new mongoose.Types.ObjectId(project._id),
        role: "admin",
    });

    await logActivity(project._id, "Project", project._id, "created", req.user._id, "Project created");

    return res
        .status(201)
        .json(new ApiResponse(201, project, "Project created successfully!"));
});

const updateProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const { projectId } = req.params;

    const project = await Project.findByIdAndUpdate(
        projectId,
        {
            name,
            description,
            status: req.body.status,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
        },
        { new: true },
    );

    if (!project) {
        throw new ApiErrors(404, "Project not found!");
    }

    await logActivity(project._id, "Project", project._id, "updated", req.user._id, "Project details updated");

    return res
        .status(200)
        .json(new ApiResponse(200, project, "Project Updated Successfully!"));
});

const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
        throw new ApiErrors(404, "Project not found!");
    }

    // Cascade delete associated data
    const tasks = await Task.find({ project: projectId });
    const taskIds = tasks.map(t => t._id);

    await SubTask.deleteMany({ task: { $in: taskIds } });
    await Task.deleteMany({ project: projectId });
    await ProjectMember.deleteMany({ project: projectId });
    await ProjectNote.deleteMany({ project: projectId });
    await Activity.deleteMany({ project: projectId });
    await Notification.deleteMany({ targetId: projectId });

    await logActivity(project._id, "Project", project._id, "deleted", req.user._id, "Project deleted");

    return res
        .status(200)
        .json(new ApiResponse(200, project, "Project deleted successfully!"));
});

const getProjects = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search, status, priority, sortBy, sortType = "desc" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let projectMatch = {};
    if (search) {
        projectMatch.name = { $regex: search, $options: "i" };
    }
    if (status) projectMatch.status = status;
    if (priority) projectMatch.priority = priority;

    let sortOption = {};
    if (sortBy) {
        sortOption[`project.${sortBy}`] = sortType === "asc" ? 1 : -1;
    } else {
        sortOption[`project.createdAt`] = -1;
    }

    const projects = await ProjectMember.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(req.user._id),
            },
        },
        {
            $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "project",
                pipeline: [
                    {
                        $match: projectMatch
                    },
                    {
                        $lookup: {
                            from: "projectmembers",
                            localField: "_id",
                            foreignField: "project",
                            as: "projectmembers",
                        },
                    },
                    {
                        $addFields: {
                            members: {
                                $size: "$projectmembers",
                            },
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$project",
        },
        {
            $project: {
                project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    status: 1,
                    priority: 1,
                    dueDate: 1,
                    members: 1,
                    createdAt: 1,
                    createdBy: 1,
                },
                role: 1,
                _id: 0,
            },
        },
        { $sort: sortOption },
        {
            $facet: {
                metadata: [{ $count: "total" }, { $addFields: { page: parseInt(page), limit: parseInt(limit) } }],
                data: [{ $skip: skip }, { $limit: parseInt(limit) }]
            }
        }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, projects[0], "Projects fetched successfully!"));
});
const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiErrors(404, "Project not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, project, "Project fetched successfully"));
});
const addMemberToProject = asyncHandler(async (req, res) => {
    const { email, role } = req.body;
    const { projectId } = req.params;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiErrors(404, "User does not exists");
    }

    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiErrors(404, "Project not found");
    }

    const isValidRole = project.customRoles.some(r => r.name === role);
    if (!isValidRole) {
        throw new ApiErrors(400, "Invalid role for this project");
    }

    await ProjectMember.findOneAndUpdate(
        {
            user: new mongoose.Types.ObjectId(user._id),
            project: new mongoose.Types.ObjectId(projectId),
        },
        {
            user: new mongoose.Types.ObjectId(user._id),
            project: new mongoose.Types.ObjectId(projectId),
            role: role,
        },
        { new: true, upsert: true },
    );

    await logActivity(projectId, "Project", projectId, "member_added", req.user._id, `Added member ${user.username} with role ${role}`);
    await createNotification(user._id, `You have been added to a project`, `/projects/${projectId}`, projectId);

    return res
        .status(201)
        .json(new ApiResponse(201, {}, "Project member added successfully"));
});
const getProjectMembers = asyncHandler(async (req, res) => {
    const { projectId } = req.params

    const project = await Project.findById(projectId)

    if (!project) { throw new ApiErrors(404, "Project not found") }

    const ProjectMembers = await ProjectMember.aggregate([
        {
            $match: {
                project: new mongoose.Types.ObjectId(projectId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            fullName: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                user: {
                    $arrayElemAt: ["$user", 0]
                }
            }
        },
        {
            $project: {
                project: 1,
                user: 1,
                role: 1,
                createdAt: 1,
                updatedAt: 1,
                _id: 0,
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, ProjectMembers, "Project Members fetched successfully"))
});
const updateMemberRole = asyncHandler(async (req, res) => {
    const { projectId, userId } = req.params
    const { newRole } = req.body

    const project = await Project.findById(projectId);
    if (!project) throw new ApiErrors(404, "Project not found");

    const isValidRole = project.customRoles.some(r => r.name === newRole);
    if (!isValidRole) throw new ApiErrors(400, "Invalid role for this project");

    let projectMember = await ProjectMember.findOne({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId)
    })

    if (!projectMember) { throw new ApiErrors(404, "Project Member Not found") }

    projectMember = await ProjectMember.findByIdAndUpdate(projectMember._id, { role: newRole }, { new: true })

    if (!projectMember) { throw new ApiErrors(404, "Project Member Not found") }

    return res.status(200).json(new ApiResponse(200, ProjectMember, "Project Member role updated successfully"))

});
const deleteMember = asyncHandler(async (req, res) => {
    const { projectId, userId } = req.params

    const projectMember = await ProjectMember.findOneAndDelete({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId)
    })

    if (!projectMember) { throw new ApiErrors(404, "Project Member not found") }

    await logActivity(projectId, "Project", projectId, "member_removed", req.user._id, `Removed a member from the project`);

    return res.status(200).json(new ApiResponse(200, {}, "Project Member Deleted Successsfully"))
});

const addCustomStatus = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { name, category, color } = req.body;

    if (!name || !category) throw new ApiErrors(400, "Name and category are required");

    const project = await Project.findById(projectId);
    if (!project) throw new ApiErrors(404, "Project not found");

    if (project.taskStatuses.some(s => s.name === name)) {
        throw new ApiErrors(400, "Status with this name already exists");
    }

    project.taskStatuses.push({ name, category, color });
    await project.save();

    await logActivity(projectId, "Project", projectId, "settings_updated", req.user._id, `Added custom status ${name}`);

    return res.status(201).json(new ApiResponse(201, project.taskStatuses, "Custom status added successfully"));
});

const addCustomPriority = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { name, level, color } = req.body;

    if (!name || level === undefined) throw new ApiErrors(400, "Name and level are required");

    const project = await Project.findById(projectId);
    if (!project) throw new ApiErrors(404, "Project not found");

    if (project.taskPriorities.some(p => p.name === name)) {
        throw new ApiErrors(400, "Priority with this name already exists");
    }

    createdAt: 1,
        createdBy: 1,
                },
    role: 1,
    _id: 0,
            },
        },
{ $sort: sortOption },
{
    $facet: {
        metadata: [{ $count: "total" }, { $addFields: { page: parseInt(page), limit: parseInt(limit) } }],
            data: [{ $skip: skip }, { $limit: parseInt(limit) }]
    }
}
    ]);

return res
    .status(200)
    .json(new ApiResponse(200, projects[0], "Projects fetched successfully!"));
});
const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiErrors(404, "Project not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, project, "Project fetched successfully"));
});
const addMemberToProject = asyncHandler(async (req, res) => {
    const { email, role } = req.body;
    const { projectId } = req.params;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiErrors(404, "User does not exists");
    }

    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiErrors(404, "Project not found");
    }

    const isValidRole = project.customRoles.some(r => r.name === role);
    if (!isValidRole) {
        throw new ApiErrors(400, "Invalid role for this project");
    }

    await ProjectMember.findOneAndUpdate(
        {
            user: new mongoose.Types.ObjectId(user._id),
            project: new mongoose.Types.ObjectId(projectId),
        },
        {
            user: new mongoose.Types.ObjectId(user._id),
            project: new mongoose.Types.ObjectId(projectId),
            role: role,
        },
        { new: true, upsert: true },
    );

    await logActivity(projectId, "Project", projectId, "member_added", req.user._id, `Added member ${user.username} with role ${role}`);
    await createNotification(user._id, `You have been added to a project`, `/projects/${projectId}`, projectId);

    return res
        .status(201)
        .json(new ApiResponse(201, {}, "Project member added successfully"));
});
const getProjectMembers = asyncHandler(async (req, res) => {
    const { projectId } = req.params

    const project = await Project.findById(projectId)

    if (!project) { throw new ApiErrors(404, "Project not found") }

    const ProjectMembers = await ProjectMember.aggregate([
        {
            $match: {
                project: new mongoose.Types.ObjectId(projectId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            fullName: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                user: {
                    $arrayElemAt: ["$user", 0]
                }
            }
        },
        {
            $project: {
                project: 1,
                user: 1,
                role: 1,
                createdAt: 1,
                updatedAt: 1,
                _id: 0,
            }
        }
    ])

    return res.status(200).json(new ApiResponse(200, ProjectMembers, "Project Members fetched successfully"))
});
const updateMemberRole = asyncHandler(async (req, res) => {
    const { projectId, userId } = req.params
    const { newRole } = req.body

    const project = await Project.findById(projectId);
    if (!project) throw new ApiErrors(404, "Project not found");

    const isValidRole = project.customRoles.some(r => r.name === newRole);
    if (!isValidRole) throw new ApiErrors(400, "Invalid role for this project");

    let projectMember = await ProjectMember.findOne({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId)
    })

    if (!projectMember) { throw new ApiErrors(404, "Project Member Not found") }

    projectMember = await ProjectMember.findByIdAndUpdate(projectMember._id, { role: newRole }, { new: true })

    if (!projectMember) { throw new ApiErrors(404, "Project Member Not found") }

    return res.status(200).json(new ApiResponse(200, ProjectMember, "Project Member role updated successfully"))

});
const deleteMember = asyncHandler(async (req, res) => {
    const { projectId, userId } = req.params

    const projectMember = await ProjectMember.findOneAndDelete({
        project: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId)
    })

    if (!projectMember) { throw new ApiErrors(404, "Project Member not found") }

    await logActivity(projectId, "Project", projectId, "member_removed", req.user._id, `Removed a member from the project`);

    return res.status(200).json(new ApiResponse(200, {}, "Project Member Deleted Successsfully"))
});

const addCustomStatus = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { name, category, color } = req.body;

    if (!name || !category) throw new ApiErrors(400, "Name and category are required");

    const project = await Project.findById(projectId);
    if (!project) throw new ApiErrors(404, "Project not found");

    if (project.taskStatuses.some(s => s.name === name)) {
        throw new ApiErrors(400, "Status with this name already exists");
    }

    project.taskStatuses.push({ name, category, color });
    await project.save();

    await logActivity(projectId, "Project", projectId, "settings_updated", req.user._id, `Added custom status ${name}`);

    return res.status(201).json(new ApiResponse(201, project.taskStatuses, "Custom status added successfully"));
});

const addCustomPriority = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { name, level, color } = req.body;

    if (!name || level === undefined) throw new ApiErrors(400, "Name and level are required");

    const project = await Project.findById(projectId);
    if (!project) throw new ApiErrors(404, "Project not found");

    if (project.taskPriorities.some(p => p.name === name)) {
        throw new ApiErrors(400, "Priority with this name already exists");
    }

    project.taskPriorities.push({ name, level, color });
    await project.save();

    await logActivity(projectId, "Project", projectId, "settings_updated", req.user._id, `Added custom priority ${name}`);

    return res.status(201).json(new ApiResponse(201, project.taskPriorities, "Custom priority added successfully"));
});

const deleteCustomStatus = asyncHandler(async (req, res) => {
    const { projectId, statusName } = req.params;
    const project = await Project.findById(projectId);
    if (!project) throw new ApiErrors(404, "Project not found");

    project.taskStatuses = project.taskStatuses.filter(s => s.name !== statusName);
    await project.save();
    await logActivity(projectId, "Project", projectId, "settings_updated", req.user._id, `Deleted custom status ${statusName}`);
    return res.status(200).json(new ApiResponse(200, project.taskStatuses, "Status deleted successfully"));
});

const deleteCustomPriority = asyncHandler(async (req, res) => {
    const { projectId, priorityName } = req.params;
    const project = await Project.findById(projectId);
    if (!project) throw new ApiErrors(404, "Project not found");

    project.taskPriorities = project.taskPriorities.filter(p => p.name !== priorityName);
    await project.save();
    await logActivity(projectId, "Project", projectId, "settings_updated", req.user._id, `Deleted custom priority ${priorityName}`);
    return res.status(200).json(new ApiResponse(200, project.taskPriorities, "Priority deleted successfully"));
});

const addCustomRole = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { name, permissions } = req.body;

    if (!name || !Array.isArray(permissions)) throw new ApiErrors(400, "Name and permissions array are required");

    const project = await Project.findById(projectId);
    if (!project) throw new ApiErrors(404, "Project not found");

    if (project.customRoles.some(r => r.name === name)) {
        throw new ApiErrors(400, "Role with this name already exists");
    }

    project.customRoles.push({ name, permissions });
    await project.save();

    await logActivity(projectId, "Project", projectId, "settings_updated", req.user._id, `Added custom role ${name}`);

    return res.status(201).json(new ApiResponse(201, project.customRoles, "Custom role added successfully"));
});

export {
    createProject,
    updateProject,
    deleteProject,
    getProjects,
    getProjectById,
    addMemberToProject,
    getProjectMembers,
    updateMemberRole,
    deleteMember,
    addCustomStatus,
    deleteCustomStatus,
    addCustomPriority,
    deleteCustomPriority,
    addCustomRole,
};
