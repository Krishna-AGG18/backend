import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiErrors } from "../utils/api-errors.js";
import jwt from "jsonwebtoken";
import {ProjectMember} from "../models/projectmember.models.js"
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

export const validateProjectPermission = (roles =[]) => {
    asyncHandler(async (req,res,next) => {
        const {projectId} = req.params

        if(!projectId) {throw new ApiErrors(400,"ProjectId is missing")}

        const project = await ProjectMember.findOne({
            project : new mongoose.Types.ObjectId(projectId),
            user : new mongoose.Types.ObjectId(req.user._id)
        })

        if(!project) {throw new ApiErrors(404,"Project not found")}

        const givenRole = project?.role

        req.user.role = givenRole

        if(!roles.includes(givenRole)){
            throw new ApiErrors(403,"You do not have permission to perform this action.")
        }

        next()
    })
}