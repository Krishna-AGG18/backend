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
    //task 
})
const createTask = asyncHandler(async (req, res) => {
    //task
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