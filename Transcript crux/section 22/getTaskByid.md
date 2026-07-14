### Lecture Overview
This lecture focused on the implementation of the `getTaskById` controller. Because fetching a specific task requires retrieving deeply nested relationships (the assigned user, the task's subtasks, and the users who created those subtasks), the instructor introduced **MongoDB Aggregation Pipelines** as a more powerful and efficient alternative to chaining multiple `.populate()` calls.

---

### What the Code Does (Explanation)

The `getTaskById` controller uses `Task.aggregate()` to execute a series of data transformation steps (a pipeline) directly on the database level. 

Here is a step-by-step breakdown of the aggregation pipeline stages built in the lecture:

#### 1. `$match` (Finding the Task)
The very first step is to filter the entire `tasks` collection down to just the single document we care about.
```javascript
{
  $match: {
    _id: new mongoose.Types.ObjectId(taskId)
  }
}
```

#### 2. First `$lookup` (Populating "Assigned To" User)
Next, the pipeline performs a `$lookup` (which is like a SQL `JOIN`) to fetch the details of the user assigned to the task.
*   It matches the `assignedTo` field in the Task with the `_id` field in the `users` collection.
*   **Nested Pipeline:** Inside this lookup, another `pipeline` array is defined containing a `$project` stage. This acts as a filter to ensure we only return safe fields (`_id`, `username`, `fullName`, `avatar`) rather than the entire user document (which might include passwords or tokens).

#### 3. Second `$lookup` (Populating Subtasks and their Creators)
The next `$lookup` joins the `subtasks` collection where the current task's ID matches the `task` field in the subtask document.
*   **Deeply Nested Pipeline:** Inside this subtask lookup, *another* `$lookup` is performed to find the user who created the subtask (`createdBy`). This demonstrates how aggregation pipelines can fetch multiple levels of relational data in a single query.

#### 4. `$addFields` and `$arrayElemAt` (Cleaning up Data Structures)
A quirk of `$lookup` in MongoDB is that it always returns matched documents as an **array**, even if there is only a 1-to-1 relationship (like one user assigned to a task).
```javascript
{
  $addFields: {
    assignedTo: {
      $arrayElemAt: ["$assignedTo", 0]
    }
  }
}
```
This stage takes the `assignedTo` array, extracts the first element (index `0`), and replaces the array with just the object itself. This makes the final JSON response much cleaner for the frontend to consume.

#### 5. Returning the Result
Because `aggregate()` always returns an array of results, the code checks if the array length is 0 (meaning no task was found) and throws a 404 error. If successful, it returns the first item in the array (`task[0]`), which contains the fully assembled data structure.

### Key Takeaways
*   **`populate()` vs `aggregate()`**: Use `populate()` for simple 1-level deep relationships. As soon as you need nested relationships (like a Task -> Subtask -> User), switch to **Aggregation Pipelines** for better performance and flexibility.
*   **Pipelines within Lookups:** You can run full aggregation pipelines *inside* a `$lookup` stage, which is incredibly powerful for filtering and projecting joined data on the fly.
*   **Extracting Array Elements:** Use `$addFields` combined with `$arrayElemAt` to convert arrays returned by `$lookup` into single objects when you know the relationship is strictly 1-to-1.
