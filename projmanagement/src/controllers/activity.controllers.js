import { asyncHandler } from "../utils/async-handler.js";
import { ApiErrors } from "../utils/api-errors.js";
import { ApiResponse } from "../utils/api-response.js";
import { Activity } from "../models/activity.models.js";
import mongoose from "mongoose";

export const getProjectActivities = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const activities = await Activity.find({ project: new mongoose.Types.ObjectId(projectId) })
        .populate("performedBy", "username fullname avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const totalCount = await Activity.countDocuments({ project: new mongoose.Types.ObjectId(projectId) });

    return res
        .status(200)
        .json(new ApiResponse(200, { metadata: { total: totalCount, page: parseInt(page), limit: parseInt(limit) }, data: activities }, "Activities fetched successfully!"));
});

export const logActivity = async (entityId, entityType, project, action, performedBy, details = "") => {
    try {
        await Activity.create({
            entityId,
            entityType,
            project,
            action,
            performedBy,
            details
        });
    } catch (error) {
        console.error("Failed to log activity:", error);
    }
};
