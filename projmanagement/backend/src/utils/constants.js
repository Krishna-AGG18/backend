export const UserRolesEnum = {
    ADMIN : "admin",
    PROJECT_ADMIN : "project_admin",
    MEMBER : "member"
}

export const AvailableUserRoles = Object.values(UserRolesEnum)

export const TaskStatusEnum = {
    TODO : "todo",
    IN_PROGRESS : "in_progress",
    DONE : "done"
}

export const AvailableTaskStatus = Object.values(TaskStatusEnum)

export const PriorityEnum = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high"
}

export const AvailablePriorities = Object.values(PriorityEnum)

export const ProjectStatusEnum = {
    PLANNING: "planning",
    ACTIVE: "active",
    ON_HOLD: "on_hold",
    COMPLETED: "completed"
}

export const AvailableProjectStatus = Object.values(ProjectStatusEnum)