# Backend Auth Course — Phase 2

# Lecture: Project Controllers (Create, Update & Delete)

Based on the uploaded lecture transcript. 

---

# 📍 Where We Are in the Project

In the previous lecture, we designed the database.

```text
User
Project
ProjectMember
Task
SubTask
ProjectNote
```

Now we are moving one layer above the database.

Instead of designing models, we start writing **controllers** that interact with those models.

Current Backend Architecture:

```text
Frontend
     │
HTTP Request
     │
Routes
     │
verifyJWT
     │
Controller   ← (Today's Lecture)
     │
Mongoose Models
     │
MongoDB
```

---

# Authentication Assumption

The instructor makes one very important assumption.

> **Every Project API is protected.**

That means before reaching the controller,

```text
verifyJWT
```

has already executed.

So inside every controller we already have

```js
req.user
```

available.

---

# Request Lifecycle

Before this lecture:

```text
Client
    │
Login
    │
JWT Cookie
```

After login:

```text
Client
     │
Create Project
     │
verifyJWT
     │
req.user Available
     │
Project Controller
```

Notice:

The controller **does not verify JWT again**.

Why?

Because middleware already did that.

This is called

> **Separation of Concerns**

---

# Controllers Implemented

This lecture implements three CRUD operations.

```text
POST    /projects
PATCH   /projects/:projectId
DELETE  /projects/:projectId
```

Later lectures will implement

```text
GET /projects
GET /projects/:id
```

using Aggregation Pipelines.

---

# Controller 1 — Create Project

---

# Purpose

Create a new project.

But...

The instructor also performs another operation.

He automatically creates

```text
ProjectMember
```

document.

This is extremely important.

---

# Incoming Request

```http
POST /projects
```

Body

```json
{
    "name":"Portfolio",
    "description":"My Backend Project"
}
```

---

# Step 1 — Extract Request Body

```js
const { name, description } = req.body;
```

---

## Why?

Frontend sends

```json
{
    "name":"Portfolio",
    "description":"Backend"
}
```

Controller extracts values.

---

# Step 2 — Create Project

```js
const project = await Project.create({
    name,
    description,
    createdBy: ...
});
```

---

## Mongoose Method

```js
Project.create()
```

---

### What does it do?

Internally

```text
Validate Schema
        │
Insert Document
        │
Return Created Document
```

Equivalent MongoDB query

```js
db.projects.insertOne(...)
```

---

# createdBy Field

```js
createdBy:
req.user._id
```

Remember

verifyJWT already executed.

So

```text
JWT
     │
verifyJWT
     │
Find User
     │
req.user
```

Now

```js
req.user._id
```

is available.

---

# Why Use Logged-in User?

Suppose

Krishna creates project.

Database stores

```json
{
   "name":"Portfolio",
   "createdBy":"USER_ID"
}
```

Later we can answer

```text
Who created this project?
```

---

# Why Convert to ObjectId?

Instructor uses

```js
new mongoose.Types.ObjectId(
    req.user._id
)
```

---

## Why?

Although

```js
req.user._id
```

often works directly,

explicit conversion guarantees

```text
MongoDB ObjectId
```

instead of plain string.

---

### Interview Concept

Difference

```text
"687ab..."
```

(String)

vs

```text
ObjectId("687ab...")
```

(ObjectId)

MongoDB relationships should ideally use ObjectIds.

---

# Database After Creation

Projects Collection

```json
{
 "_id":"P101",
 "name":"Portfolio",
 "description":"Backend",
 "createdBy":"U201"
}
```

---

# Step 3 — Create Project Member

This is the smartest part of the lecture.

Immediately after creating project,

another document is created.

```js
ProjectMember.create(...)
```

---

## Why?

Think logically.

If someone creates project,

he automatically becomes member.

Otherwise

```text
Project Exists

BUT

No Members
```

That would be inconsistent.

---

# ProjectMember Document

```json
{
    "user":"U201",
    "project":"P101",
    "role":"ADMIN"
}
```

Notice

One API call

creates

two database documents.

---

# Flow Diagram

```text
Create Project Request
        │
        ▼
Project.create()
        │
        ▼
ProjectMember.create()
        │
        ▼
Response
```

---

# Why Not Store Members Inside Project?

Bad Design

```json
{
   "members":[]
}
```

Good Design

```text
Project Collection

ProjectMember Collection
```

Reason

Each membership has

* role
* permissions
* timestamps

Relationship itself contains data.

---

# Role Assignment

```js
role:
UserRolesEnum.ADMIN
```

Meaning

Creator automatically becomes

```text
Project Admin
```

No second API call required.

---

# Response

```js
return res.status(201)
```

---

Why 201?

HTTP Status Codes

```text
200

Existing resource returned.
```

```text
201

New resource created.
```

Interview question.

---

# Create Project Complete Flow

```text
Client
    │
POST /projects
    │
verifyJWT
    │
req.user
    │
Extract Body
    │
Create Project
    │
Create ProjectMember
    │
Return 201
```

---

# Database Changes

Before

```text
Projects

0
```

After

Projects

```text
Portfolio
```

ProjectMembers

```text
Krishna → ADMIN
```

---

# Controller 2 — Update Project

Purpose

Update

* name
* description

---

# Incoming Request

```http
PATCH /projects/:projectId
```

Body

```json
{
   "name":"Updated Name",
   "description":"Updated"
}
```

---

# Step 1

Extract Body

```js
const {
   name,
   description
}
= req.body;
```

---

# Step 2

Extract URL Parameter

```js
const {
   projectId
}
= req.params;
```

---

Remember

URL

```text
/projects/12345
```

becomes

```js
req.params.projectId
```

---

# Step 3

Update

```js
Project.findByIdAndUpdate()
```

---

Method Signature

```js
findByIdAndUpdate(

id,

updateData,

options
)
```

---

Parameter 1

```js
projectId
```

Which project?

---

Parameter 2

```js
{
 name,
 description
}
```

What to update?

---

Parameter 3

```js
{
 new:true
}
```

Most important.

---

## Why new:true ?

Without

```js
new:true
```

MongoDB returns

```text
Old Document
```

Example

Before

```text
Portfolio
```

After update

```text
Portfolio Backend
```

Without

```js
new:true
```

Response still contains

```text
Portfolio
```

Wrong.

---

With

```js
new:true
```

Returns

```text
Portfolio Backend
```

Updated document.

---

# Step 4

Null Check

```js
if(!project)
```

---

When does this happen?

User sends

```text
Wrong ID
```

MongoDB returns

```js
null
```

---

Response

```text
404

Project Not Found
```

---

# Response

```text
200 OK
```

because

resource already existed.

---

# Update Flow

```text
Client
     │
PATCH
     │
Extract Params
     │
Extract Body
     │
findByIdAndUpdate()
     │
Project Found?
      │
      ├──No
      │    │
      │   404
      │
      └──Yes
            │
            ▼
         Updated Project
```

---

# Controller 3 — Delete Project

---

Purpose

Delete project.

---

Request

```http
DELETE /projects/:projectId
```

---

# Step 1

Extract

```js
projectId
```

---

# Step 2

Delete

```js
Project.findByIdAndDelete()
```

---

Equivalent MongoDB

```js
db.projects.deleteOne(...)
```

---

# Step 3

Check

```js
if(!project)
```

---

Why?

Suppose

```text
Already Deleted
```

or

```text
Wrong ID
```

MongoDB returns

```js
null
```

---

# Response

```text
200

Project Deleted Successfully
```

---

# Delete Flow

```text
Client
     │
DELETE
     │
Find Project
     │
Delete
     │
Success
```

---

# Important Production Discussion

The instructor mentions

> You *could* also delete related project members.

This introduces an important backend concept.

---

# Cascade Delete

Current

Delete Project

```text
Project Deleted

ProjectMembers Stay

Tasks Stay
```

Possible issue:

Orphaned records remain.

---

Production Flow

```text
Delete Project
       │
       ├──Delete Members
       ├──Delete Tasks
       ├──Delete SubTasks
       ├──Delete Notes
       │
       ▼
Complete Cleanup
```

This is called

> **Cascade Deletion**

Many production systems implement it using

* MongoDB Transactions
* Middleware (`pre('deleteOne')`)
* Service layer logic
* Background jobs

---

# Request Lifecycle (Create)

```text
Frontend
      │
POST /projects
      │
verifyJWT
      │
req.user
      │
Controller
      │
Project.create()
      │
ProjectMember.create()
      │
MongoDB
      │
Response
```

---

# Request Lifecycle (Update)

```text
PATCH
      │
verifyJWT
      │
Controller
      │
findByIdAndUpdate()
      │
Database
      │
Updated Document
```

---

# Request Lifecycle (Delete)

```text
DELETE
      │
verifyJWT
      │
Controller
      │
findByIdAndDelete()
      │
MongoDB
      │
Success
```

---

# Database Changes Summary

## Create

Projects

```text
+1 Document
```

ProjectMembers

```text
+1 Document
```

---

## Update

Projects

```text
Existing Document Modified
```

---

## Delete

Projects

```text
Document Removed
```

Related collections remain unchanged unless additional cleanup logic is added.

---

# Interview Concepts

## Difference

```js
create()
```

vs

```js
new Model().save()
```

Both insert documents.

`create()` is shorter.

---

## What does `findByIdAndUpdate()` return?

Without

```js
new:true
```

Old document.

With

```js
new:true
```

Updated document.

---

## Why use `req.user._id`?

Never trust client input for ownership.

The authenticated user identity should come from verified JWT middleware, not from the request body.

---

## Why create ProjectMember separately?

Because membership contains additional information such as role, timestamps, and permissions. This models the relationship cleanly and supports many users per project.

---

# Common Beginner Mistakes

### ❌ Trusting client for `createdBy`

```js
createdBy:req.body.userId
```

A malicious client could create projects on behalf of another user.

---

### ✅ Use authenticated user

```js
createdBy:req.user._id
```

---

### ❌ Forgetting `new:true`

Response contains stale data.

---

### ❌ Not checking `null`

```js
const project = await Project.findByIdAndDelete(id);
```

Immediately returning success without verifying the project existed can lead to incorrect responses.

---

# Progress Tracker

```text
Phase 1
──────────────
✅ Authentication
✅ JWT
✅ Cookies
✅ Routes
✅ Validators
✅ Password Reset

Phase 2
──────────────
✅ Database Design
✅ Project Model
✅ Project Controllers
   ✅ Create
   ✅ Update
   ✅ Delete

Next →
🔜 Get All Projects
🔜 Get Project By ID
🔜 MongoDB Aggregation Pipeline
🔜 populate() vs Aggregation
```

## 🧠 Senior Developer Insight

The key architectural lesson in this lecture is that **controllers are responsible for maintaining business consistency**, not just inserting records. Creating a project also creates a corresponding `ProjectMember` record so the creator automatically becomes an admin. This demonstrates how a single API request can coordinate multiple database operations to keep related collections synchronized. It also reinforces a security best practice: always derive ownership (`createdBy`) from the authenticated user (`req.user`) provided by the JWT middleware rather than trusting client-supplied IDs.
