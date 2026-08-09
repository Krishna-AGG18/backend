import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        link: {
            type: String, // Optional URL to navigate to when the notification is clicked
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
        },
    },
    { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
