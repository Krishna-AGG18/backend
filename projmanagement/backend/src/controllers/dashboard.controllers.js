import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { Task } from "../models/task.models.js";
import mongoose from "mongoose";

export const getDashboardStats = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // 1. Get user's projects summary
    const projects = await ProjectMember.aggregate([
        {
            $match: { user: new mongoose.Types.ObjectId(userId) }
        },
        {
            $lookup: {
                from: "projects",
                localField: "project",
                foreignField: "_id",
                as: "projectDetails"
            }
        },
        { $unwind: "$projectDetails" },
        {
            $group: {
                _id: "$projectDetails.status",
                count: { $sum: 1 }
            }
        }
    ]);

    let projectStats = { total: 0, active: 0, completed: 0, planning: 0, on_hold: 0 };
    projects.forEach(p => {
        projectStats[p._id] = p.count;
        projectStats.total += p.count;
    });

    // 2. Get user's tasks summary
    const tasks = await Task.aggregate([
        {
            $match: { assignedTo: new mongoose.Types.ObjectId(userId) }
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);

    let taskStats = { total: 0, todo: 0, in_progress: 0, done: 0 };
    tasks.forEach(t => {
        taskStats[t._id] = t.count;
        taskStats.total += t.count;
    });

    // 3. Upcoming tasks (due soon)
    const upcomingTasks = await Task.find({
        assignedTo: new mongoose.Types.ObjectId(userId),
        status: { $ne: "done" }
    })
    .sort({ dueDate: 1 })
    .limit(5)
    .populate("project", "name");

    return res
        .status(200)
        .json(new ApiResponse(200, {
            projects: projectStats,
            tasks: taskStats,
            upcomingTasks
        }, "Dashboard stats fetched successfully!"));
});
