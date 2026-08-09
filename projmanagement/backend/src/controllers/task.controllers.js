import { Task } from "../models/task.models.js";
import { SubTask } from "../models/subtask.models.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiErrors } from "../utils/api-errors.js";
import { Project } from "../models/project.models.js";
import mongoose from "mongoose";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import fs from "fs/promises";
import path from "path";
import { logActivity } from "./activity.controllers.js";
import { createNotification } from "./notification.controllers.js";

const getTasks = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { page = 1, limit = 10, search, status, priority, sortBy, sortType = "desc" } = req.query;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiErrors(404, "Project not found");
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    let taskMatch = { project: new mongoose.Types.ObjectId(projectId) };

    if (search) {
        taskMatch.title = { $regex: search, $options: "i" };
    }
    if (status) taskMatch.status = status;
    if (priority) taskMatch.priority = priority;

    let sortOption = {};
    if (sortBy) {
        sortOption[sortBy] = sortType === "asc" ? 1 : -1;
    } else {
        sortOption["createdAt"] = -1;
    }

    const tasks = await Task.find(taskMatch)
        .populate("assignedTo", "avatar username fullName")
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit));
        
    const totalCount = await Task.countDocuments(taskMatch);

    return res
        .status(200)
        .json(new ApiResponse(200, { metadata: [{ total: totalCount, page: parseInt(page), limit: parseInt(limit) }], data: tasks }, "Tasks fetched successfully!"));
});
const createTask = asyncHandler(async (req, res) => {
    const { title, description, assignedTo, status } = req.body;
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiErrors(404, "Project not found");
    }

    if (status) {
        const isValidStatus = project.taskStatuses.some(s => s.name === status);
        if (!isValidStatus) throw new ApiErrors(400, "Invalid status for this project");
    }

    if (req.body.priority) {
        const isValidPriority = project.taskPriorities.some(p => p.name === req.body.priority);
        if (!isValidPriority) throw new ApiErrors(400, "Invalid priority for this project");
    }

    const files = req.files || [];

    const attachments = files.map((file) => {
        return {
            url: `${req.protocol}://${req.get("host")}/images/${file.filename}`,
            mimetype: file.mimetype,
            size: file.size,
        };
    });

    const task = await Task.create({
        title,
        description,
        project: new mongoose.Types.ObjectId(projectId),
        assignedTo: assignedTo
            ? new mongoose.Types.ObjectId(assignedTo)
            : undefined,
        status,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
        assignedBy: new mongoose.Types.ObjectId(req.user._id),
        attachments,
    });

    await logActivity(task._id, "Task", projectId, "created", req.user._id, `Task '${title}' created`);

    if (assignedTo) {
        await createNotification(assignedTo, `You were assigned a new task: ${title}`, `/projects/${projectId}/tasks/${task._id}`, projectId);
    }

    return res
        .status(201)
        .json(new ApiResponse(201, task, "Task created successfully"));
});
const getTaskById = asyncHandler(async (req, res) => {
    const { projectId, taskId } = req.params;

    const task = await Task.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(taskId),
                project: new mongoose.Types.ObjectId(projectId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "assignedTo",
                foreignField: "_id",
                as: "assignedTo",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            username: 1,
                            fullName: 1,
                            avatar: 1,
                        }
                    },
                ],
            },
        },
        {
            $lookup: {
                from: "subtasks",
                localField: "_id",
                foreignField: "task",
                as: "subtasks",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "createdBy",
                            foreignField: "_id",
                            as: "createdBy",
                            pipeline : [
                                {
                                    $project : {
                                        _id : 1,
                                        username : 1,
                                        fullName: 1,
                                        avatar : 1,
                                    }
                                }
                            ]
                        },
                    },
                    {
                        $addFields : {
                            createdBy : {
                                $arrayElemAt : ["$createdBy",0]
                            }
                        }
                    }
                ],
            },
        },
        {
          $addFields : {
            assignedTo : {
                $arrayElemAt : ["$assignedTo",0]
            }
          }
        }
    ]);

    if(!task || task.length === 0){
        throw new ApiErrors(404, "Task not found")
    }

    return res.status(200).json(new ApiResponse(200,task[0], "Task fetched successfully!"))
});
const updateTask = asyncHandler(async (req, res) => {
    const { projectId, taskId } = req.params;
    const { title, description, assignedTo, status } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiErrors(404, "Project not found");
    }

    let updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;
    if (req.body.priority !== undefined) updateFields.priority = req.body.priority;
    if (req.body.dueDate !== undefined) updateFields.dueDate = req.body.dueDate;
    if (assignedTo) updateFields.assignedTo = new mongoose.Types.ObjectId(assignedTo);

    if (status) {
        const isValidStatus = project.taskStatuses.some(s => s.name === status);
        if (!isValidStatus) throw new ApiErrors(400, "Invalid status for this project");
    }

    if (req.body.priority) {
        const isValidPriority = project.taskPriorities.some(p => p.name === req.body.priority);
        if (!isValidPriority) throw new ApiErrors(400, "Invalid priority for this project");
    }

    const task = await Task.findOneAndUpdate(
        { _id: taskId, project: projectId },
        { $set: updateFields },
        { new: true }
    );

    if (!task) {
        throw new ApiErrors(404, "Task not found");
    }

    await logActivity(task._id, "Task", projectId, "updated", req.user._id, `Task '${task.title}' updated`);

    if (assignedTo) {
        await createNotification(assignedTo, `Task '${task.title}' was assigned to you`, `/projects/${projectId}/tasks/${task._id}`, projectId);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, task, "Task updated successfully"));
});
const deleteTask = asyncHandler(async (req, res) => {
    const { projectId, taskId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiErrors(404, "Project not found!");
    }

    const task = await Task.findOneAndDelete({ _id: taskId, project: projectId });

    if (!task) {
        throw new ApiErrors(404, "Task not found!");
    }

    if (task.attachments && task.attachments.length > 0) {
        for (const attachment of task.attachments) {
            try {
                const filename = attachment.url.split("/").pop();
                if (filename) {
                    const filePath = path.resolve("./public/images", filename);
                    await fs.unlink(filePath).catch(err => console.error("Error deleting file:", err));
                }
            } catch (err) {
                console.error("Failed to delete attachment:", err);
            }
        }
    }

    await logActivity(taskId, "Task", projectId, "deleted", req.user._id, `Task '${task.title}' deleted`);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Task deleted successfully"));
});
const createSubTask = asyncHandler(async (req, res) => {
    const { projectId, taskId } = req.params;
    const { title, isCompleted } = req.body;

    if (!title) {
        throw new ApiErrors(400, "Title is required");
    }

    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiErrors(404, "Project not found!");
    }

    const task = await Task.findOne({ _id: taskId, project: projectId });
    if (!task) {
        throw new ApiErrors(404, "Task not found!");
    }

    const subTask = await SubTask.create({
        title,
        task: new mongoose.Types.ObjectId(taskId),
        isCompleted: isCompleted !== undefined ? isCompleted : false,
        createdBy: new mongoose.Types.ObjectId(req.user._id),
    });

    return res
        .status(201)
        .json(new ApiResponse(201, subTask, "Subtask created successfully"));
});
const updateSubTask = asyncHandler(async (req, res) => {
    const { projectId, subTaskId } = req.params;
    const { title, isCompleted } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiErrors(404, "Project not found!");
    }

    let subTask = await SubTask.findById(subTaskId).populate("task");
    if (!subTask) {
        throw new ApiErrors(404, "Subtask not found!");
    }

    if (subTask.task.project.toString() !== projectId) {
        throw new ApiErrors(403, "Subtask does not belong to this project");
    }

    let updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (isCompleted !== undefined) updateFields.isCompleted = isCompleted;

    subTask = await SubTask.findByIdAndUpdate(
        subTaskId,
        { $set: updateFields },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, subTask, "Subtask updated successfully"));
});
const deleteSubTask = asyncHandler(async (req, res) => {
    const { projectId, subTaskId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiErrors(404, "Project not found!");
    }

    const subTask = await SubTask.findById(subTaskId).populate("task");

    if (!subTask) {
        throw new ApiErrors(404, "Subtask not found!");
    }

    if (subTask.task.project.toString() !== projectId) {
        throw new ApiErrors(403, "Subtask does not belong to this project");
    }

    await SubTask.findByIdAndDelete(subTaskId);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Subtask deleted successfully"));
});

export {
    createSubTask,
    createTask,
    deleteSubTask,
    deleteTask,
    updateSubTask,
    updateTask,
    getTaskById,
    getTasks,
};
