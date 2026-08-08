import { Router } from "express";
import { getUserNotifications, markNotificationRead, markAllNotificationsRead } from "../controllers/notification.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getUserNotifications);
router.route("/read-all").put(markAllNotificationsRead);
router.route("/:notificationId/read").put(markNotificationRead);

export default router;
