import { Router } from "express";
import { getProjectActivities } from "../controllers/activity.controllers.js";
import { verifyJWT, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";

const router = Router();
router.use(verifyJWT);

const ANY_ROLE = [];

router.route("/:projectId").get(validateProjectPermission(ANY_ROLE), getProjectActivities);

export default router;
