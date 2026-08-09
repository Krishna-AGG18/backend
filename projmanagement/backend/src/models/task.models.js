import mongoose, { Schema } from "mongoose";
import { AvailableTaskStatus, TaskStatusEnum, AvailablePriorities, PriorityEnum } from "../utils/constants.js";

const taskSchema = new Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    description : String,
    project : {
        type : Schema.Types.ObjectId,
        ref : "Project",
        required : true,
    },
    assignedTo : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    assignedBy : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    status : {
        type : String,
        required : true,
    },
    priority: {
        type : String,
        required : true,
    },
    attachments : {
        type : [{url : String, mimetype : String, size:Number}],
        default : []
    },
    dueDate: {
        type: Date
    }
},{timestamps : true})

export const Task = mongoose.model("Task",taskSchema)