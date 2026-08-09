import { asyncHandler } from "../utils/async-handler.js";
import { ApiErrors } from "../utils/api-errors.js";
import { ApiResponse } from "../utils/api-response.js";
import { Notification } from "../models/notification.models.js";
import mongoose from "mongoose";

export const getUserNotifications = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const notifications = await Notification.find({ user: new mongoose.Types.ObjectId(req.user._id) })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const totalCount = await Notification.countDocuments({ user: new mongoose.Types.ObjectId(req.user._id) });
    const unreadCount = await Notification.countDocuments({ user: new mongoose.Types.ObjectId(req.user._id), isRead: false });

    return res
        .status(200)
        .json(new ApiResponse(200, { metadata: { total: totalCount, unread: unreadCount, page: parseInt(page), limit: parseInt(limit) }, data: notifications }, "Notifications fetched successfully!"));
});

export const markNotificationRead = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, user: req.user._id },
        { isRead: true },
        { new: true }
    );

    if (!notification) {
        throw new ApiErrors(404, "Notification not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, notification, "Notification marked as read"));
});

export const markAllNotificationsRead = asyncHandler(async (req, res) => {
    await Notification.updateMany(
        { user: req.user._id, isRead: false },
        { $set: { isRead: true } }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, null, "All notifications marked as read"));
});

export const createNotification = async (userId, message, link, projectId = null) => {
    try {
        await Notification.create({
            user: userId,
            message,
            link,
            project: projectId
        });
    } catch (error) {
        console.error("Failed to create notification:", error);
    }
};
