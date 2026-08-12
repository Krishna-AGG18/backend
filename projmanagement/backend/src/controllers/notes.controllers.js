import { Task } from "../models/task.models.js";
import { SubTask } from "../models/subtask.models.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiErrors } from "../utils/api-errors.js";
import { Project } from "../models/project.models.js";
import mongoose from "mongoose";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import { ProjectNote } from "../models/note.models.js";

const createNote = asyncHandler(async (req,res) => {
    const {projectId} = req.params;
    const {content, title} = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiErrors(404, "Project not found");
    }

    const note = await ProjectNote.create({
            project: new mongoose.Types.ObjectId(projectId),
            createdBy : new mongoose.Types.ObjectId(req.user._id),
            title: title || "Untitled Note",
            content
        });

    return res
        .status(201)
        .json(new ApiResponse(201, note, "Note created successfully"));
})
const getProjectNotes = asyncHandler(async (req,res) => {
    const {projectId} = req.params;
    
    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiErrors(404, "Project not found");
    }

    const notes = await ProjectNote.find({
        project : new mongoose.Types.ObjectId(projectId)
    }).populate("createdBy","avatar username fullName")

    return res
        .status(200)
        .json(new ApiResponse(200, notes, "Notes fetched successfully"));

})
const getNoteDetails = asyncHandler(async (req,res) => {
    const {projectId, noteId} = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiErrors(404, "Project not found");
    }

    const note = await ProjectNote.findOne({
        _id: new mongoose.Types.ObjectId(noteId),
        project: new mongoose.Types.ObjectId(projectId)
    }).populate("createdBy", "avatar username fullName");

    if (!note) {
        throw new ApiErrors(404, "Note not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, note, "Note details fetched successfully"));
})
const updateNote = asyncHandler(async (req,res) => {
    const {projectId, noteId} = req.params;
    const {content, title} = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiErrors(404, "Project not found");
    }

    const note = await ProjectNote.findOne({
        _id: new mongoose.Types.ObjectId(noteId),
        project: new mongoose.Types.ObjectId(projectId)
    });

    if (!note) {
        throw new ApiErrors(404, "Note not found");
    }

    if (!content) {
        throw new ApiErrors(400, "Note content is required");
    }

    note.content = content;
    if (title) note.title = title;
    await note.save();

    return res
        .status(200)
        .json(new ApiResponse(200, note, "Note updated successfully"));
})
const deleteNote = asyncHandler(async (req,res) => {
    const {projectId, noteId} = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiErrors(404, "Project not found");
    }

    const deletedNote = await ProjectNote.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(noteId),
        project: new mongoose.Types.ObjectId(projectId)
    });

    if (!deletedNote) {
        throw new ApiErrors(404, "Note not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Note deleted successfully"));
})

export {
    createNote,
    deleteNote,
    updateNote,
    getNoteDetails,
    getProjectNotes
}