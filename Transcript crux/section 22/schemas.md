# Backend Authentication Course → Phase 2 Notes

# Lecture: Database Design & Mongoose Relationship Models

Based on the lecture transcript. 

---

# 🚀 Phase Transition

Until now (Phase 1), we built the **Authentication System**.

```text
Client
    ↓
Register
    ↓
Verify Email
    ↓
Login
    ↓
JWT
    ↓
Protected Routes
```

Now authentication is complete.

The next step is:

> **Designing the database for the actual Project Management application.**

Authentication was only the **foundation**.

Now we start building the business logic.

---

# Big Picture

The instructor is now moving from

```text
Authentication
```

to

```text
Project Management
```

Instead of only storing users,

now the application will store

* Projects
* Members
* Tasks
* Subtasks
* Notes

Everything revolves around the **User**.

---

# Overall Database Architecture

This is the most important diagram of the lecture.

```text
                    User
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        │             │             │
     Project      ProjectMember     Task
        │             │             │
        │             │             │
        │             │             │
      Notes         Role         SubTask
```

Notice something important.

Everything eventually connects back to

```text
User
```

because

* users create projects
* users join projects
* users assign tasks
* users complete tasks
* users write notes

---

# Why Database Design Matters?

A beginner usually thinks

```text
Let's just create collections.
```

A senior developer thinks

```text
How will these collections communicate?
```

That is called

> **Database Schema Design**

---

# What is a Schema?

Think of a schema as a blueprint.

Example

```js
User
{
   name,
   email,
   password
}
```

It tells MongoDB

> Every User document should look like this.

---

# Why Multiple Collections?

Imagine storing everything inside User.

```text
User
 ├── Projects
 ├── Tasks
 ├── Members
 ├── Notes
 ├── Attachments
 ├── Subtasks
```

Very quickly

```text
User
≈ 5000 fields
```

Not scalable.

Instead

```text
Users Collection
Projects Collection
Tasks Collection
Notes Collection
```

Each collection has one responsibility.

This follows the **Single Responsibility Principle (SRP)**.

---

# Collections Created

The instructor creates five new models.

```text
User
Project
ProjectMember
Task
SubTask
ProjectNote
```

---

# Relationship Diagram

```text
User
 │
 │ creates
 ▼
Project
 │
 │ has many
 ▼
Task
 │
 │ has many
 ▼
SubTask
```

Another relationship

```text
Project
      │
      ├──────────► Notes
      │
      └──────────► Members
```

---

# Understanding References

This lecture introduces

```js
Schema.Types.ObjectId
```

This is one of the most asked MongoDB interview topics.

---

# Why ObjectId?

Suppose

User Collection

```json
{
 "_id":"64a12",
 "name":"Krishna"
}
```

Project Collection

Instead of storing

```json
{
 "createdBy":"Krishna"
}
```

we store

```json
{
 "createdBy":"64a12"
}
```

Why?

Names can change.

IDs never change.

---

# Mongoose Reference

```js
createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
}
```

Let's understand every line.

---

## type

```js
Schema.Types.ObjectId
```

Meaning

```text
This field stores another document's ID.
```

---

## ref

```js
ref: "User"
```

Meaning

```text
This ObjectId belongs to User collection.
```

---

Think like SQL.

Instead of

```sql
FOREIGN KEY(user_id)
```

MongoDB uses

```js
ObjectId + ref
```

---

# Relationship Flow

```text
User
 │
 │ _id = 648ab
 ▼

Project

createdBy = 648ab
```

No duplication.

Only reference.

---

# Why Not Store Whole User?

Bad

```json
{
   createdBy:{
      name:"Krishna",
      email:"..."
   }
}
```

Imagine user changes email.

Now

every project

must update.

Huge problem.

Reference solves this.

---

# Project Model

The first model created.

---

## Structure

```text
Project
──────────────
name
description
createdBy
timestamps
```

---

## Name

```js
name:{
   type:String,
   required:true,
   unique:true,
   trim:true
}
```

---

### required

Cannot create project without name.

---

### unique

No duplicate names.

Example

```
Portfolio
Portfolio
```

Second insert fails.

---

### trim

Before

```
"   Portfolio   "
```

After

```
Portfolio
```

Removes unnecessary spaces.

---

# Description

Simple string.

```js
description:String
```

Optional project description.

---

# createdBy

This is the most important field.

```js
createdBy:{
    type:Schema.Types.ObjectId,
    ref:"User"
}
```

---

Flow

```text
Logged In User
       │
       ▼
Creates Project
       │
       ▼
Project.createdBy
       │
       ▼
User._id
```

---

# Why Save Creator?

Later we can answer

```text
Who created this project?
```

without storing duplicate user data.

---

# timestamps:true

Automatically adds

```text
createdAt

updatedAt
```

No manual coding.

---

# Project Collection Example

```json
{
 "_id":"P001",
 "name":"Project Management",
 "description":"Backend API",
 "createdBy":"U101"
}
```

---

# Exporting Model

```js
mongoose.model(
   "Project",
   projectSchema
)
```

---

What happens?

Mongoose creates collection

```
projects
```

Plural + lowercase.

Interview Question ✅

---

# ProjectMember Model

This model is extremely important.

Most beginners think

```text
Project
   ↓
Users
```

Enough.

It is NOT.

Why?

Because every member has a role.

Example

```text
Krishna → Admin

Rahul → Member

Aman → Project Admin
```

A simple array cannot represent this cleanly.

---

# Why Separate Collection?

Instead of

```text
Project
   members:[]
```

we create

```text
ProjectMember
```

Reason

Each relationship has information.

Example

```text
User

Role

Project
```

Relationship itself stores data.

---

# Structure

```text
ProjectMember

user

project

role
```

---

# User Reference

```js
user:{
   type:ObjectId,
   ref:"User"
}
```

---

# Project Reference

```js
project:{
   type:ObjectId,
   ref:"Project"
}
```

---

This creates

Many-to-Many Relationship.

Diagram

```text
User
   │
   │
ProjectMember
   │
   │
Project
```

Exactly like SQL Junction Tables.

---

# Role Field

```js
role:{
    type:String,
    enum:availableUserRoles
}
```

---

Why enum?

Without enum

```text
Admin

admin

ADMIN

administrator

boss
```

Everything gets stored.

Mess.

---

With enum

Only

```text
Admin

ProjectAdmin

Member
```

allowed.

---

Default Role

```js
default:
UserRolesEnum.MEMBER
```

Every new member automatically becomes

```
Member
```

unless changed.

---

# Task Model

Now each project has tasks.

Diagram

```text
Project
     │
     ▼
Task
```

---

Task Structure

```text
title

description

project

assignedBy

assignedTo

status

attachments
```

---

# Project Reference

Each task belongs to exactly one project.

```text
Project
     │
     ▼
Task
```

---

# assignedBy

Who created task?

```text
Manager
```

---

# assignedTo

Who performs task?

```text
Developer
```

---

Important

Both reference

```text
User
```

but represent different meanings.

---

# Task Status

Uses enum again.

```js
status:{
 enum:availableTaskStatuses
}
```

Example

```
Todo

In Progress

Completed
```

Nothing else allowed.

---

# Default

```text
Todo
```

Every new task starts here.

---

# Attachments

Instead of

```text
attachment:String
```

Instructor uses

```js
attachments:[]
```

Why?

Because task can have

```
image

pdf

zip

video
```

multiple files.

---

Each attachment stores

```text
URL

Mime Type

Size
```

Example

```json
{
"url":"cloudinary....",
"mimeType":"application/pdf",
"size":30291
}
```

Very production-oriented design.

---

# Why Store Mime Type?

Suppose frontend loads file.

It needs to know

```
PDF

PNG

JPEG

MP4
```

Mime type provides this.

---

# Why Store Size?

Useful for

* showing file size
* validating uploads
* limiting upload size

---

# Why Default Empty Array?

Without default

```js
attachments.map()
```

throws

```
Cannot read property 'map'
```

With

```js
default:[]
```

Safe.

---

# SubTask Model

Relationship

```text
Task
    │
    ▼
SubTask
```

---

Structure

```text
title

task

isCompleted

createdBy
```

---

Task Reference

Every subtask belongs to one task.

---

# isCompleted

Instead of

```text
Todo

Done

Pending
```

Instructor uses

```js
Boolean
```

because

Subtask only has two states.

```
true

false
```

Simple.

---

Default

```text
false
```

---

createdBy

Stores

```
User._id
```

---

# Project Note Model

Structure

```text
project

createdBy

content
```

---

Diagram

```text
Project
     │
     ▼
Note
```

---

Why Separate Notes?

Imagine

Project

contains

```text
1000 Notes
```

Huge document.

Instead

```
Notes Collection
```

stores independently.

---

# Complete Database Relationship

```text
               User
                 │
      ┌──────────┼─────────────┐
      │          │             │
      ▼          ▼             ▼
 Project     ProjectMember     Task
      │          │             │
      │          │             │
      ▼          ▼             ▼
    Note       Role        SubTask
```

---

# Database Request Example

Suppose user creates project.

Flow

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
createdBy=req.user._id
      │
MongoDB
```

---

Later user creates task.

```text
POST /tasks
      │
Project Exists?
      │
Yes
      │
Task Stores
Project ID
Assigned User ID
Creator ID
```

---

# Interview Concepts

## What is ObjectId?

Unique MongoDB identifier used to reference another document.

---

## What does `ref` do?

Tells Mongoose which model this ObjectId belongs to.

Used later with

```js
.populate()
```

---

## Why Normalize Data?

Avoid duplication.

Easy updates.

Smaller documents.

Better scalability.

---

## SQL Equivalent

MongoDB

```js
ObjectId
```

≈

SQL

```sql
FOREIGN KEY
```

---

## Why Enum?

Restricts allowed values.

Improves data consistency.

---

## Why Separate Collections?

Each entity has its own responsibility.

Example

```
User
Project
Task
```

instead of one huge document.

---

# Common Beginner Mistakes

### ❌ Storing username instead of ObjectId

```js
createdBy:"Krishna"
```

If username changes, every related document becomes inconsistent.

---

### ✅ Store ObjectId

```js
createdBy:ObjectId(...)
```

---

### ❌ No Enum

```text
todo
Todo
TO DO
completed
finish
done
```

Data becomes inconsistent.

---

### ✅ Enum

Only predefined values are accepted.

---

### ❌ Embedding every task inside Project

Large projects may have thousands of tasks, causing oversized documents and inefficient updates.

---

### ✅ Separate Task Collection

Store only a reference to the project.

---

# Phase 2 Progress Tracker

```text
✅ Authentication System
✅ JWT & Cookies
✅ Email Verification
✅ Password Reset
✅ Route Architecture

───────────────
Phase 2
───────────────

✅ Database Design
✅ Project Model
✅ ProjectMember Model
✅ Task Model
✅ SubTask Model
✅ ProjectNote Model

Next →
🔜 Controllers for Projects
🔜 CRUD APIs
🔜 Mongoose Populate
🔜 Advanced Queries
```

## 🧠 Senior Developer Insight

This lecture isn't about writing complex code—it's about **designing relationships**. The `User` model becomes the central entity, and every other collection references it using `Schema.Types.ObjectId`. This is a production-style approach because it keeps documents small, avoids duplicate data, enforces consistency through enums, and makes future features like permissions, filtering, and `populate()` queries much easier to implement. Mastering these relationships is far more valuable than memorizing the schema syntax.
