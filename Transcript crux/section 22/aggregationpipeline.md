# Backend Development Course — Phase 2

# Lecture: Get Projects using MongoDB Aggregation Pipeline

Based on the uploaded lecture transcript. 

---

# 📍 Where We Are in the Project

So far, we have completed:

```text
Authentication
    ↓
JWT Middleware
    ↓
Database Models
    ↓
Project CRUD
(Create, Update, Delete)
```

Now the instructor starts the **first advanced backend topic** of the entire course:

> **MongoDB Aggregation Pipeline**

This is one of the most important MongoDB concepts you'll encounter in production applications.

---

# Why Can't We Simply Use `find()`?

Suppose Krishna is logged in.

Database:

```text
Projects Collection

Project A
Project B
Project C
Project D
```

Krishna created only

```text
Project A
Project C
```

If we write

```js
Project.find()
```

MongoDB returns

```text
A
B
C
D
```

❌ Wrong

We only want

```text
A
C
```

---

# Simple Solution

We can write

```js
Project.find({
    createdBy: req.user._id
})
```

This works.

But...

---

# Real Problem

Frontend doesn't only want

```text
Project Name
```

It also wants

```text
Project Name
Number of Members
My Role
Created Date
Description
```

Now imagine doing this.

---

## Query 1

```text
Get Projects
```

↓

For every project

---

## Query 2

```text
Get Members
```

↓

For every member

---

## Query 3

```text
Get User
```

↓

For every user

---

Eventually

```text
1 Project

↓

5 Queries

↓

20 Projects

↓

100 Queries
```

This is inefficient.

---

# Solution

MongoDB Aggregation Pipeline

Instead of running

```text
Many Queries
```

We let MongoDB do everything internally.

```text
MongoDB

↓

Collect

↓

Join

↓

Filter

↓

Calculate

↓

Return Final Data
```

Only **one database request**.

---

# Why Query `ProjectMember` Instead of `Project`?

This is a brilliant architectural decision.

Database

```text
Project

name

description

createdBy
```

does NOT know

```text
Role

Members
```

But

```text
ProjectMember
```

contains

```text
User

Project

Role
```

So starting from

```text
ProjectMember
```

already gives

* project reference
* user reference
* role

which is richer data.

---

# Overall Aggregation Flow

```text
ProjectMember Collection
        │
        ▼
Match Current User
        │
        ▼
Lookup Project
        │
        ▼
Lookup Project Members
        │
        ▼
Count Members
        │
        ▼
Flatten Arrays
        │
        ▼
Select Required Fields
        │
        ▼
Return Response
```

This is exactly what today's controller builds.

---

# Step 1 — Start Aggregation

```js
ProjectMember.aggregate([
    ...
])
```

---

## What is `aggregate()`?

Unlike

```js
find()
```

which simply fetches documents,

`aggregate()`

can

* filter
* join
* transform
* calculate
* reshape

the data.

Think of it as MongoDB's data processing engine.

---

# Pipeline Concept

Aggregation always receives

```js
[
   {},
   {},
   {},
   {}
]
```

Every object is called

> **Pipeline Stage**

Output of one stage

↓

becomes input of next stage.

Visual:

```text
Collection

↓

Stage 1

↓

Stage 2

↓

Stage 3

↓

Stage 4
```

---

# Stage 1 — `$match`

```js
{
   $match:{
      user:ObjectId(req.user._id)
   }
}
```

---

## Purpose

Filter documents.

Equivalent SQL

```sql
WHERE user = ?
```

Equivalent Mongoose

```js
find({
    user:req.user._id
})
```

---

### What happens?

Suppose

ProjectMember Collection

```text
Krishna → Project A

Rahul → Project A

Krishna → Project C

Aman → Project B
```

After

```js
$match
```

MongoDB keeps only

```text
Krishna → Project A

Krishna → Project C
```

Everything else disappears.

---

# Why Convert to ObjectId?

```js
ObjectId(req.user._id)
```

Again ensures MongoDB compares

```text
ObjectId

with

ObjectId
```

instead of

```text
String

vs

ObjectId
```

---

# Stage 2 — `$lookup`

This is the heart of Aggregation.

```js
{
   $lookup:{ ... }
}
```

---

## What is `$lookup`?

MongoDB version of

```sql
JOIN
```

This is probably the most important interview concept.

---

Imagine

ProjectMember

```text
project = P101
```

But we need

```text
Project Name

Description
```

Those fields exist inside

Projects Collection.

So MongoDB performs a join.

---

# Lookup Parameters

## from

```js
from:"projects"
```

Meaning

> Which collection should MongoDB search?

---

## localField

```js
localField:"project"
```

This field exists in current document.

Example

```text
project

↓

P101
```

---

## foreignField

```js
foreignField:"_id"
```

MongoDB searches

Projects Collection

for

```text
_id = P101
```

---

## as

```js
as:"project"
```

Store joined result

inside

```text
project
```

field.

---

# Visual Representation

Before

```text
ProjectMember

project = P101
```

After `$lookup`

```text
ProjectMember

project = {

name

description

createdBy

...
}
```

Huge difference.

---

# Why is `$lookup` Better?

Without lookup

```text
Project.find()

↓

for every project

↓

Member.find()

↓

for every member

↓

User.find()
```

Lots of database trips.

With lookup

```text
Single Query

↓

Everything Ready
```

---

# Stage 3 — Second `$lookup`

Now instructor performs another join.

This time

```text
Project

↓

Project Members
```

Why?

To calculate

```text
Total Members
```

---

Flow

```text
Project

↓

Find All Members

↓

Store Them

↓

Count Them
```

---

# Stage 4 — `$addFields`

Now MongoDB creates

new field.

```js
{
   members:{
      $size:"$projectMembers"
   }
}
```

---

## Why?

Suppose

projectMembers

contains

```text
Rahul

Krishna

Aman
```

MongoDB calculates

```text
members = 3
```

Now frontend immediately receives

```text
3 Members
```

without calculating.

---

# What is `$size`?

Counts elements inside array.

Example

```js
[
1,
2,
3,
4
]
```

↓

```js
$size
```

↓

```text
4
```

---

# Stage 5 — `$unwind`

This confuses many beginners.

Suppose lookup returns

```js
project:[
   {
      ...
   }
]
```

Notice

It's still an array.

But every ProjectMember belongs to only one project.

We don't need array.

---

`$unwind`

converts

```text
[
Project
]
```

into

```text
Project
```

Single object.

---

Visual

Before

```text
project

↓

[
 Project Object
]
```

After

```text
project

↓

Project Object
```

Much easier to work with.

---

# Stage 6 — `$project`

Don't confuse

```text
Project Collection
```

with

```js
$project
```

They are different.

---

`$project`

means

> Choose which fields should be returned.

---

Example

Without projection

MongoDB returns

```text
_id

description

timestamps

__v

members

...

20 fields
```

Frontend doesn't need everything.

---

Using

```js
$project
```

we select only

```text
_id

name

description

members

role

createdAt

createdBy
```

---

# Why Use 1 and 0?

```js
name:1
```

means

```text
Include
```

---

```js
_id:0
```

means

```text
Exclude
```

---

Example

```js
{
    name:1,
    description:1
}
```

returns

```json
{
   "name":"Portfolio",
   "description":"Backend"
}
```

Nothing else.

---

# Complete Aggregation Pipeline

```text
ProjectMember

↓

Match Current User

↓

Lookup Project

↓

Lookup Members

↓

Calculate Member Count

↓

Flatten Project

↓

Select Final Fields

↓

Response
```

---

# Response

```js
return res.status(200).json(
   new ApiResponse(
      200,
      projects,
      ...
   )
)
```

Frontend finally receives

```json
[
   {
      "name":"Portfolio",
      "members":4,
      "role":"ADMIN"
   },
   {
      "name":"E-Commerce",
      "members":8,
      "role":"MEMBER"
   }
]
```

One query.

Everything ready.

---

# Request Lifecycle

```text
Frontend

↓

GET /projects

↓

verifyJWT

↓

req.user

↓

Aggregation Pipeline

↓

MongoDB

↓

Response
```

---

# Why Aggregation Instead of `populate()`?

A very common interview question.

### `populate()`

* Easy to write
* Great for simple relationships
* Good for one or two joins

Example:

```js
Project.find().populate("createdBy");
```

---

### Aggregation

* Supports multiple joins
* Can calculate values (`$size`, `$sum`, `$avg`)
* Can filter, reshape, group data
* Better for dashboards, reports, analytics, complex APIs

This lecture is a perfect example because it:

* joins multiple collections,
* computes member counts,
* returns only selected fields.

---

# SQL Comparison

Aggregation

```js
$match
```

≈

```sql
WHERE
```

---

```js
$lookup
```

≈

```sql
JOIN
```

---

```js
$project
```

≈

```sql
SELECT column1,column2
```

---

```js
$addFields
```

≈

```sql
Computed Columns
```

---

# Interview Concepts

## What is Aggregation Pipeline?

A sequence of processing stages where the output of one stage becomes the input of the next.

---

## What does `$lookup` do?

Joins another collection.

MongoDB equivalent of SQL JOIN.

---

## What does `$match` do?

Filters documents.

Equivalent of `WHERE`.

---

## What does `$project` do?

Controls which fields appear in the final output.

---

## Why use `$unwind`?

Converts an array field into individual documents (or, in this case, simplifies a single-element array into an object).

---

## What does `$addFields` do?

Creates new computed fields without modifying the original stored document.

---

# Common Beginner Mistakes

### ❌ Using collection name incorrectly

```js
from:"Project"
```

Wrong.

MongoDB uses actual collection names.

Usually

```text
projects
```

(lowercase + plural).

---

### ❌ Forgetting `$`

```js
size:"projectMembers"
```

Wrong.

Must reference fields with

```js
"$projectMembers"
```

---

### ❌ Skipping `$unwind`

You'll receive

```js
project:[
   {...}
]
```

instead of

```js
project:{...}
```

which makes accessing nested fields more cumbersome.

---

### ❌ Returning every field

Sending entire MongoDB documents (including internal fields) wastes bandwidth and exposes unnecessary data.

Use `$project` to return only what the client needs.

---

# 🧠 Senior Developer Insight

This lecture demonstrates a key principle of backend engineering: **move complex data shaping into the database whenever practical**. Instead of fetching projects, then members, then roles through multiple queries and combining them in application code, the aggregation pipeline performs filtering (`$match`), joining (`$lookup`), computation (`$addFields`), reshaping (`$unwind`), and field selection (`$project`) in a single database operation. This reduces database round trips, keeps controller code cleaner, and produces API responses that are already tailored for the frontend.
