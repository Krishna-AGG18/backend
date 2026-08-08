import { Router } from "express";
import { getProjectActivities } from "../controllers/activity.controllers.js";
import { verifyJWT, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { paginationValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();
router.use(verifyJWT);

const ANY_ROLE = [];

router.route("/:projectId").get(paginationValidator(), validate, validateProjectPermission(ANY_ROLE), getProjectActivities);

export default router;
