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

const { ADMIN, PROJECT_ADMIN, MEMBER } = UserRolesEnum;
const ALL_ROLES = [ADMIN, PROJECT_ADMIN, MEMBER];
const ADMIN_ROLES = [ADMIN, PROJECT_ADMIN];

// Task Routes
router
    .route("/:projectId")
    .get(validateProjectPermission(ALL_ROLES), getTasks)
    .post(validateProjectPermission(ADMIN_ROLES), upload.array("attachments"), createTask);

router
    .route("/:projectId/t/:taskId")
    .get(validateProjectPermission(ALL_ROLES), getTaskById)
    .put(validateProjectPermission(ADMIN_ROLES), updateTask)
    .delete(validateProjectPermission(ADMIN_ROLES), deleteTask);

// Subtask Routes
router
    .route("/:projectId/t/:taskId/subtasks")
    .post(validateProjectPermission(ADMIN_ROLES), createSubTask);

router
    .route("/:projectId/st/:subTaskId")
    .put(validateProjectPermission(ALL_ROLES), updateSubTask)
    .delete(validateProjectPermission(ADMIN_ROLES), deleteSubTask);

export default router;
