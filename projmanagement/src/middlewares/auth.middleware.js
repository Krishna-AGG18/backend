import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiErrors } from "../utils/api-errors.js";
import jwt from "jsonwebtoken";
import { ProjectMember } from "../models/projectmember.models.js";
import { Project } from "../models/project.models.js";
import mongoose from "mongoose";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiErrors(401, "Unauthorised request");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
        );

        if (!user) {
            throw new ApiErrors(401, "Invalid Access Token");
        }

        req.user = user;
        next()
    } catch (error) {
        throw new ApiErrors(401,"Invalid Access Token");
    }
});

export const validateProjectPermission = (requiredPermissions = []) => {
    return asyncHandler(async (req, res, next) => {
        const { projectId } = req.params;

        if (!projectId) { throw new ApiErrors(400, "ProjectId is missing") }

        const projectMember = await ProjectMember.findOne({
            project: new mongoose.Types.ObjectId(projectId),
            user: new mongoose.Types.ObjectId(req.user._id)
        });

        if (!projectMember) { throw new ApiErrors(403, "You are not a member of this project") }

        const givenRole = projectMember?.role;
        req.user.role = givenRole;

        const project = await Project.findById(projectId);
        if (!project) throw new ApiErrors(404, "Project not found");

        const userRoleDef = project.customRoles.find(r => r.name === givenRole);
        if (!userRoleDef) {
            throw new ApiErrors(403, "Your assigned role is no longer valid in this project.");
        }

        // If the required permissions is empty, they just need to be a member
        if (requiredPermissions.length === 0) {
            return next();
        }

        // Check if the user's role has 'all' permission (like a master admin), or if it contains at least one of the required permissions
        const hasPermission = userRoleDef.permissions.includes("manage_project") || 
                              requiredPermissions.some(perm => userRoleDef.permissions.includes(perm));

        if (!hasPermission) {
            throw new ApiErrors(403, "You do not have permission to perform this action.")
        }

        next();
    });
};