import mongoose, { Schema } from "mongoose";
import { AvailableProjectStatus, ProjectStatusEnum, AvailablePriorities, PriorityEnum } from "../utils/constants.js";

const projectSchema = new Schema({
    name : {
        type : String,
        required: true,
        unique : true,
        trim : true
    },
    description : {
        type : String,   
    },
    createdBy : {
        type : Schema.Types.ObjectId,   // used to refer other schema in the db
        ref : "User",
        required : true
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
    dueDate: {
        type: Date
    }
},{timestamps: true})

export const Project = mongoose.model("Project",projectSchema)