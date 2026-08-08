import { body, query } from "express-validator";
import { AvailableUserRoles, AvailablePriorities, AvailableProjectStatus, AvailableTaskStatus } from "../utils/constants.js";

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lower case")
            .isLength({ min: 3 })
            .withMessage("Username must be atleast 3 characters long"),
        body("password").trim().notEmpty().withMessage("Password is required"),
        body("fullName").optional().trim(),
    ];
};
const userLoginValidator = () => {
    return [
        body("email").isEmail().withMessage("Email is invalid"),
        body("password").notEmpty().withMessage("Password is required"),
    ];
};

const userChangeCurrentPasswordValidator = () => {
    return [
        body("oldPassword").notEmpty().withMessage("Old Password is required"),
        body("newPassword").notEmpty().withMessage("New Password is required"),
    ];
};

const userForgotPasswordValidator = () => {
    return [
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
    ];
};

const userResetForgotPasswordValidator = () => {
    return [body("newPassword").notEmpty().withMessage("Password is required")];
};

const createProjectValidator = () => {
    return [
        body("name").notEmpty().withMessage("Name is required"),
        body("description").optional(),
        body("status").optional().isIn(AvailableProjectStatus).withMessage("Invalid status"),
        body("priority").optional().isIn(AvailablePriorities).withMessage("Invalid priority"),
        body("dueDate").optional().isISO8601().withMessage("Invalid date format"),
    ];
};

const createTaskValidator = () => {
    return [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").optional(),
        body("status").optional().isIn(AvailableTaskStatus).withMessage("Invalid status"),
        body("priority").optional().isIn(AvailablePriorities).withMessage("Invalid priority"),
        body("dueDate").optional().isISO8601().withMessage("Invalid date format"),
    ];
};

const paginationValidator = () => {
    return [
        query("page").optional().isInt({ min: 1 }).withMessage("Page must be >= 1"),
        query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
        query("sortBy").optional().isString(),
        query("sortType").optional().isIn(["asc", "desc"]).withMessage("SortType must be asc or desc"),
    ];
};

const addMemberToProjectValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is required"),
        body("role")
            .notEmpty()
            .withMessage("Role is required")
            .isIn(AvailableUserRoles)
            .withMessage("Role is invalid")
    ]
}

const noteValidator = () => {
    return [
        body("content")
            .trim()
            .notEmpty()
            .withMessage("Note content is required"),
    ];
};

export {
    userRegisterValidator,
    userLoginValidator,
    userChangeCurrentPasswordValidator,
    userForgotPasswordValidator,
    userResetForgotPasswordValidator,
    createProjectValidator,
    createTaskValidator,
    paginationValidator,
    addMemberToProjectValidator,
    noteValidator,
};
