import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema(
    {
        entityId: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: "entityType",
        },
        entityType: {
            type: String,
            required: true,
            enum: ["Project", "Task"],
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        action: {
            type: String,
            required: true,
        },
        performedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        details: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Activity = mongoose.model("Activity", activitySchema);
