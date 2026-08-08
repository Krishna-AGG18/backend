import mongoose, { Schema } from "mongoose";
import { AvailableProjectStatus, ProjectStatusEnum, AvailablePriorities, PriorityEnum } from "../utils/constants.js";

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,   // used to refer other schema in the db
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: AvailableProjectStatus,
        default: ProjectStatusEnum.ACTIVE
    },
    priority: {
        type: String,
        enum: AvailablePriorities,
        default: PriorityEnum.MEDIUM
    },
    taskStatuses: [{
        name: { type: String, required: true }, // e.g. "To Do", "In Review"
        category: { type: String, enum: ['todo', 'in_progress', 'done'], required: true }, // For analytics
        color: { type: String, default: "#CCCCCC" }
    }],
    taskPriorities: [{
        name: { type: String, required: true },
        level: { type: Number, required: true }, // e.g. 1 (Low), 2 (Medium), 3 (High)
        color: { type: String, default: "#CCCCCC" }
    }],
    customRoles: [{
        name: { type: String, required: true }, // e.g. "Admin", "Viewer"
        permissions: [{ type: String }] // e.g. ["create_task", "delete_project"]
    }],
    dueDate: {
        type: Date
    }
}, { timestamps: true })

export const Project = mongoose.model("Project", projectSchema)