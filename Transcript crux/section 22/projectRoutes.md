### Lecture Overview
This lecture focused on building the routing layer for the `projects` feature in an Express.js application. The instructor demonstrated how to structure routes efficiently, enforce authentication across all project routes, and implement role-based access control (RBAC) using custom middlewares. 

The core philosophy emphasized was: **Always consult the Project Requirement Document (PRD)** when writing routes, and ensure that all project-related operations are restricted to verified users.

---

### What the Code Does (Explanation)

The code creates a dedicated router file (`project.routes.js`) to handle all project-related API endpoints. It then integrates this router into the main application file (`app.js`).

Here is a breakdown of the key technical implementations:

#### 1. Global Middleware for Authentication
Instead of adding authentication checks to every single route individually, the instructor used a router-level middleware shortcut:
```javascript
router.use(verifyJWT);
```
This single line ensures that **any route** defined after it will automatically require the user to be logged in (verified via JWT). This keeps the code clean and secure by default.

#### 2. Defining Routes and HTTP Methods
The instructor defined several routes, grouping different HTTP methods (GET, POST, PUT, DELETE) under specific paths:

*   **`/` (Base Route - handled in app.js as `/projects`)**
    *   `GET`: Fetches projects (`getProjects` controller).
    *   `POST`: Creates a new project. It first runs the `createProjectValidator` to ensure the input data is correct before hitting the controller.

*   **`/:projectId` (Operations on a specific project)**
    *   `GET`: Fetches a project by ID. It uses `validateProjectPermission` to check if the user is allowed to view it (in this case, `availableUserRoles` meaning any authenticated role).
    *   `PUT`: Updates a project. Restricted to `admin` only using `validateProjectPermission([UserRolesEnum.ADMIN])`.
    *   `DELETE`: Deletes a project. Also restricted to `admin` only.

*   **`/:projectId/members` (Managing members in general)**
    *   `GET`: Gets all members of a specific project.
    *   `POST`: Adds new members to a project. Restricted to `admin` and uses `addMembersToProjectValidator`.

*   **`/:projectId/members/:userId` (Operations on a specific member)**
    *   `PUT`: Updates a specific member's role. Restricted to `admin`.
    *   `DELETE`: Removes a specific member from the project. Restricted to `admin`.

#### 3. Role-Based Access Control (RBAC)
A custom middleware, `validateProjectPermission`, is heavily used. It accepts an array of allowed roles (using enums like `UserRolesEnum.ADMIN` is preferred over hardcoded strings like `"admin"`). This makes it incredibly easy to define exactly who can perform which action on a route-by-route basis.

#### 4. Express Params (`:colon` syntax)
The lecture highlighted how Express handles dynamic URLs. By prefixing a route segment with a colon (e.g., `/:projectId` or `/:userId`), Express automatically extracts that value from the URL and makes it available in `req.params`. The order of these params in the URL doesn't affect how they are accessed in the object.

#### 5. Integration into `app.js`
Finally, the new router is imported into `app.js` and mounted to a specific path:
```javascript
app.use('/projects', projectRouter);
```
This means all the routes defined in `project.routes.js` will actually be prefixed with `/projects` when hitting the API (e.g., `/projects/:projectId/members`).

### Key Takeaways
*   **Scalability:** The routing structure is designed to be easily readable and scalable. Chaining middlewares (Validator -> Validator Collector -> Controller) makes the flow of data obvious.
*   **Security:** Enforcing `verifyJWT` globally for the router prevents accidental unprotected endpoints.
*   **Enums over Strings:** Using Enums (`UserRolesEnum.ADMIN`) for permissions is better practice than using raw strings (`"admin"`) to prevent typos and make refactoring easier.