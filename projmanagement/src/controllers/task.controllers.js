import {Task} from "../models/task.models.js"
import {SubTask} from "../models/subtask.models.js"
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiErrors } from "../utils/api-errors.js";
import { Project } from "../models/project.models.js";
import mongoose from "mongoose";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";

const getTasks = asyncHandler(async (req, res) => {
    const {projectId} = req.params;

    const project = await Project.findById(projectId)

    if(!project){ throw new ApiErrors(404,"Project not found")}
    const tasks = await Task.find({project : new mongoose.Types.ObjectId(projectId)}).populate("assignedTo","avatar username fullname")

    return res.status(200).json(new ApiResponse(200,tasks,"Task fetched successfully"))

})
const createTask = asyncHandler(async (req, res) => {
    const {title, description, assignedTo, status} = req.body
    const {projectId} = req.params;

    const project = await Project.findById(projectId)

    if(!project){ throw new ApiErrors(404,"Project not found")}

    const files = req.files || []

    files.map((file) => {
        return {
            url : `${process.env.SERVER_URL}/images/${file.originalname}`,
            mimetype: file.mimetype,
            size : file.size
        }
    })

    const task = await Task.create({
        title,
        description,
        project : new mongoose.Types.ObjectId(projectId),
        assignedTo : assignedTo ? new mongoose.Types.ObjectId(assignedTo): undefined,
        status,
        assignedBy : new mongoose.Types.ObjectId(req.user._id),
        attachments : files
    })

    return res.status(201).json(new ApiResponse(201,task,"Task created successfully"))
})
const getTaskById = asyncHandler(async (req, res) => {
    //task
})
const UpdateTask = asyncHandler(async (req, res) => {
    //task
})
const deleteTask = asyncHandler(async (req, res) => {
    //task
})
const createSubTask = asyncHandler(async (req, res) => {
    //task
})
const updateSubTask = asyncHandler(async (req, res) => {
    //task
})
const deleteSubTask = asyncHandler(async (req, res) => {
    //task
})

export {
    createSubTask,
    createTask,
    deleteSubTask,
    deleteTask,
    updateSubTask,
    UpdateTask,
    getTaskById,
    getTasks,
}