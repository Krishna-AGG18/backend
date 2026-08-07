import { Router } from "express";
import {
    createNote,
    deleteNote,
    updateNote,
    getNoteDetails,
    getProjectNotes,
} from "../controllers/notes.controllers.js";
import { verifyJWT, validateProjectPermission } from "../middlewares/auth.middleware.js";
import { noteValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";

const router = Router();

router.use(verifyJWT);

router
    .route("/:projectId")
    .get(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
            UserRolesEnum.PROJECT_ADMIN,
            UserRolesEnum.MEMBER,
        ]),
        getProjectNotes
    );

router
    .route("/:projectId")
    .post(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        noteValidator(),
        validate,
        createNote
    );

router
    .route("/:projectId/n/:noteId")
    .get(
        validateProjectPermission([
            UserRolesEnum.ADMIN,
            UserRolesEnum.PROJECT_ADMIN,
            UserRolesEnum.MEMBER,
        ]),
        getNoteDetails
    );

router
    .route("/:projectId/n/:noteId")
    .put(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        noteValidator(),
        validate,
        updateNote
    )
    .delete(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        deleteNote
    );
export default router;