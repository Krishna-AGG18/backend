import { Router } from "express";
import { getProjectActivities } from "../controllers/activity.controllers.js";
import { verifyJWT, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";

const router = Router();
router.use(verifyJWT);

const ALL_ROLES = [UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN, UserRolesEnum.MEMBER];

router.route("/:projectId").get(validateProjectPermission(ALL_ROLES), getProjectActivities);

export default router;
