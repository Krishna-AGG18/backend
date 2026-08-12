import { Router } from "express";

import {
    getProjectById,
    getProjectMembers,
    getProjects,
    createProject,
    updateMemberRole,
    updateProject,
    addMemberToProject,
    deleteMember,
    deleteProject,
    addCustomStatus,
    deleteCustomStatus,
    addCustomPriority,
    deleteCustomPriority,
    addCustomRole,
} from "../controllers/project.controllers.js";

import { validate } from "../middlewares/validator.middleware.js";

import {
    addMemberToProjectValidator,
    createProjectValidator,
    paginationValidator,
} from "../validators/index.js";

import {
    verifyJWT,
    validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";

// Project permissions
const ANY_ROLE = [];
const MANAGE_PROJECT = ["manage_project"];
const MANAGE_MEMBERS = ["manage_members"];

const router = Router();

router.use(verifyJWT); // whatever written after this line will run verifyJWT firstly ; use means middleware

router
    .route("/")
    .get(paginationValidator(), validate, getProjects)
    .post(createProjectValidator(),validate, createProject)

router
    .route("/:projectId")
    .get(validateProjectPermission(ANY_ROLE), getProjectById)
    .put(validateProjectPermission(MANAGE_PROJECT),       createProjectValidator(),validate,updateProject)
    .delete(validateProjectPermission(MANAGE_PROJECT),deleteProject)

router
    .route("/:projectId/members")
    .get(validateProjectPermission(ANY_ROLE), getProjectMembers)
    .post(validateProjectPermission(MANAGE_MEMBERS),addMemberToProjectValidator(),validate,addMemberToProject)

router
    .route("/:projectId/members/:userId")
    .put(validateProjectPermission(MANAGE_MEMBERS),updateMemberRole)
    .delete(validateProjectPermission(MANAGE_MEMBERS),deleteMember)

// Project Settings Routes
router
    .route("/:projectId/settings/statuses")
    .post(validateProjectPermission(MANAGE_PROJECT), addCustomStatus);

router
    .route("/:projectId/settings/statuses/:statusName")
    .delete(validateProjectPermission(MANAGE_PROJECT), deleteCustomStatus);

router
    .route("/:projectId/settings/priorities")
    .post(validateProjectPermission(MANAGE_PROJECT), addCustomPriority);

router
    .route("/:projectId/settings/priorities/:priorityName")
    .delete(validateProjectPermission(MANAGE_PROJECT), deleteCustomPriority);

router
    .route("/:projectId/settings/roles")
    .post(validateProjectPermission(MANAGE_PROJECT), addCustomRole);

export default router;
