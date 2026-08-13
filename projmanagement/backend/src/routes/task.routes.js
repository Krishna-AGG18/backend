import { Router } from "express";
import {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    createSubTask,
    updateSubTask,
    deleteSubTask
} from "../controllers/task.controllers.js";
import { verifyJWT, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// All task routes require authentication
router.use(verifyJWT);

import { createTaskValidator, paginationValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";

// Task permissions
const ALL_ROLES = [];
const CREATE_TASK = ["create_task"];
const UPDATE_TASK = ["update_task"];
const DELETE_TASK = ["delete_task"];

// Task Routes
router
    .route("/:projectId")
    .get(paginationValidator(), validate, validateProjectPermission(ALL_ROLES), getTasks)
    .post(validateProjectPermission(CREATE_TASK), upload.array("attachments"), createTaskValidator(), validate, createTask);

router
    .route("/:projectId/t/:taskId")
    .get(validateProjectPermission(ALL_ROLES), getTaskById)
    .put(validateProjectPermission(UPDATE_TASK), upload.array("attachments"), updateTask)
    .delete(validateProjectPermission(DELETE_TASK), deleteTask);

// Subtask Routes
router
    .route("/:projectId/t/:taskId/subtasks")
    .post(validateProjectPermission(CREATE_TASK), createSubTask);

router
    .route("/:projectId/st/:subTaskId")
    .put(validateProjectPermission(ALL_ROLES), updateSubTask)
    .delete(validateProjectPermission(DELETE_TASK), deleteSubTask);

export default router;
