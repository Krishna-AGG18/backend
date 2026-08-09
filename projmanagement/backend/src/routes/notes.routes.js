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
const ANY_ROLE = [];
const MANAGE_NOTES = ["manage_notes"];

const router = Router();

router.use(verifyJWT);

router
    .route("/:projectId")
    .get(validateProjectPermission(ANY_ROLE), getProjectNotes);

router
    .route("/:projectId")
    .post(
        validateProjectPermission(MANAGE_NOTES),
        noteValidator(),
        validate,
        createNote
    );

router
    .route("/:projectId/n/:noteId")
    .get(validateProjectPermission(ANY_ROLE), getNoteDetails);

router
    .route("/:projectId/n/:noteId")
    .put(
        validateProjectPermission(MANAGE_NOTES),
        noteValidator(),
        validate,
        updateNote
    )
    .delete(
        validateProjectPermission(MANAGE_NOTES),
        deleteNote
    );
export default router;