### Lecture Overview
This lecture focused on building the controller logic for Tasks (`task.controllers.js`), specifically implementing the functionalities to **create a new task** and **fetch all tasks for a project**. 

The instructor walked through validating incoming data, handling file attachments (uploaded via Multer), establishing relationships between MongoDB models using `mongoose.Types.ObjectId`, and using Mongoose's `.populate()` method to fetch related document data.

---

### What the Code Does (Explanation)

The code implements two main controllers: `createTask` and `getTasks`. Both rely on the `Task` and `Project` Mongoose models and handle standard Express Request/Response cycles wrapped in an `asyncHandler`.

#### 1. `createTask` Controller
This function handles the creation of a new task linked to a specific project.

*   **Data Extraction & Validation:** It pulls `title`, `description`, `assignedTo`, and `status` from `req.body` and the `projectId` from `req.params`. It first checks if the project actually exists in the database. If not, it throws a 404 error.
*   **Handling Attachments:** It expects files to be available in `req.files` (injected by the Multer middleware). It loops (`map`) through these files to create an array of attachment objects containing the generated `url` (combining the server URL and filename), `mimetype`, and `size`.
*   **Creating the Task:** It calls `Task.create()`. Crucially, it converts reference IDs (like `projectId`, `assignedTo`, and `req.user._id` for the `assignedBy` field) into proper MongoDB ObjectIDs using `new mongoose.Types.ObjectId()`.
*   **Response:** Returns a `201 Created` status with the newly created task document.

#### 2. `getTasks` Controller
This function fetches all tasks associated with a given project.

*   **Validation:** Similar to creation, it extracts the `projectId` from `req.params` and verifies the project exists.
*   **Finding Tasks:** It uses `Task.find({ project: new mongoose.Types.ObjectId(projectId) })` to retrieve all tasks belonging to that specific project.
*   **Populating Referenced Data:** Instead of just returning the raw user ID for the `assignedTo` field, it uses `.populate("assignedTo", "avatar username fullname")`. This tells Mongoose to go into the User collection, find the user with that ID, and attach only their `avatar`, `username`, and `fullname` to the final result. This is a simpler alternative to complex MongoDB aggregation pipelines for basic relational queries.
*   **Response:** Returns a `200 OK` status with the array of tasks.

### Key Takeaways
*   **Mongoose ObjectIDs:** When creating relationships manually or searching by a reference field, it's a good practice to cast string IDs to `mongoose.Types.ObjectId`.
*   **Handling File Arrays:** Using `.map` is an effective way to transform an array of raw file objects (from Multer) into structured objects tailored for your database schema.
*   **The Power of `.populate()`:** The `.populate()` method in Mongoose is a quick and readable way to "join" related collections and fetch nested data (like user details) without writing full aggregation pipelines.
