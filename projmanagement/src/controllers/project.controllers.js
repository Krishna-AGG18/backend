import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiErrors } from "../utils/api-errors.js";
import { Project } from "../models/project.models.js";
import mongoose from "mongoose";
import { ProjectMember } from "../models/projectmember.models.js";
import { UserRolesEnum } from "../utils/constants.js";

const createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const project = await Project.create({
        name: name,
        description: description,
        createdBy: new mongoose.Types.ObjectId(req.user._id),
    });

    await ProjectMember.create({
        user: new mongoose.Types.ObjectId(req.user._id),
        project: new mongoose.Types.ObjectId(project._id),
        role: UserRolesEnum.ADMIN,
    });

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
        },
        { new: true },
    );

    if (!project) {
        throw new ApiErrors(404, "Project not found!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, project, "Project Updated Successfully!"));
});

const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const { project } = await Project.findByIdAndDelete(projectId);

    if (!project) {
        throw new ApiErrors(404, "Project not found!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, project, "Project deleted successfully!"));
});

const getProjects = asyncHandler(async (req, res) => {
    //test
});
const getProjectById = asyncHandler(async (req, res) => {
    //test
});
const getProjectMembers = asyncHandler(async (req, res) => {
    //test
});
const addMemberToProject = asyncHandler(async (req, res) => {
    //test
});
const updateMemberRole = asyncHandler(async (req, res) => {
    //test
});
const deleteMember = asyncHandler(async (req, res) => {
    //test
});

export {
    getProjectById,
    getProjectMembers,
    getProjects,
    createProject,
    updateMemberRole,
    updateProject,
    addMemberToProject,
    deleteMember,
    deleteProject,
};
