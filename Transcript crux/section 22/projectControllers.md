# Lecture Overview

Is lecture me 5 controllers likhe gaye hain.

```text
1. Get Project By ID
2. Add Member To Project
3. Get Project Members (Aggregation)
4. Update Member Role
5. Delete Member
```

In sabka base hai ye database:

```text
Users
│
├── Krishna (U1)
├── Rahul   (U2)
└── Aman    (U3)

Projects
│
├── Portfolio (P1)
└── Ecommerce (P2)

ProjectMembers
│
├── U1 -> P1 -> Admin
├── U2 -> P1 -> Member
├── U3 -> P1 -> Member
```

---

# 1️⃣ Get Project By ID

Endpoint

```http
GET /projects/:projectId
```

Frontend bolega

```text
Mujhe sirf Project P1 chahiye.
```

Flow

```text
Client

↓

projectId

↓

findById()

↓

Project Mila?

↓

YES → Return

NO → 404
```

Code

```js
const { projectId } = req.params;
```

Meaning

URL

```text
/projects/687abc
```

becomes

```js
projectId = "687abc"
```

---

Then

```js
Project.findById(projectId)
```

MongoDB query

```js
db.projects.findOne({
   _id:ObjectId(projectId)
})
```

Project mila?

YES

↓

Return

NO

↓

404

Bas.

Ye sabse easiest controller hai.

---

# 2️⃣ Add Member To Project

Ye interesting hai.

Question

User ko project me add kaise karoge?

Obviously

Frontend bhejega

```text
Email

Role

ProjectID
```

Flow

```text
Client

↓

Email

↓

Find User

↓

User Mila?

↓

YES

↓

Create/Update ProjectMember

↓

Success
```

---

## Step 1

```js
const { email, role } = req.body;

const { projectId } = req.params;
```

Body

```json
{
   "email":"rahul@gmail.com",
   "role":"Member"
}
```

Params

```text
/project/P1
```

---

## Step 2

```js
User.findOne({
   email
})
```

Question

Why?

Because frontend sirf email bhej raha hai.

MongoDB ko ObjectId chahiye.

To pehle email se user dhoondo.

---

## Step 3

User mila?

```text
YES

↓

U2
```

No?

↓

404

---

## Step 4

Ab actual magic.

Instructor

```js
findOneAndUpdate()
```

ya

```js
findByIdAndUpdate()
```

ke saath

```js
upsert:true
```

use karta hai.

---

# Upsert kya hai?

Ye interview question hai.

Normal update

```text
Document Mila?

↓

YES

↓

Update
```

Agar nahi mila

↓

Nothing.

---

Upsert

```text
Document Mila?

↓

YES

↓

Update

↓

NO

↓

Create New
```

Yani

Update + Insert

=

Upsert

---

Isliye

Rahul pehle member nahi tha

↓

Automatically new ProjectMember ban jayega.

---

# new:true

```js
new:true
```

Default

MongoDB

```text
Purana document return karta hai.
```

new:true

```text
Updated document return karta hai.
```

---

# 3️⃣ Get Project Members

Ye lecture ka hardest part hai.

Question

Frontend bolta hai

```text
P1 ke saare members do.
```

Database

ProjectMember

```text
U1

U2

U3
```

Frontend ko

```text
Username

Avatar

Full Name
```

bhi chahiye.

Ye sab User collection me hai.

Isliye Aggregation.

---

Flow

```text
ProjectMember

↓

Match Project

↓

Lookup User

↓

Flatten User

↓

Select Fields

↓

Return
```

---

## Stage 1

```js
$match
```

Filter

```text
Project = P1
```

---

## Stage 2

```js
$lookup
```

Join

```text
Users Collection
```

Ab

ProjectMember

```json
{
   user:"U1"
}
```

ban gaya

```json
{
   user:{
      username:"Krishna",
      avatar:"..."
   }
}
```

---

## Stage 3

Pipeline

```js
$project
```

User me bahut data hai

```text
Password

RefreshToken

EmailVerification

OTP

etc
```

Frontend ko sirf chahiye

```text
Username

Avatar

Full Name
```

Isliye

```js
$project
```

---

## Stage 4

```js
$addFields
```

Lookup hamesha array deta hai.

```json
"user":[
   {...}
]
```

Hume array nahi chahiye.

Sirf ek user hai.

To

```js
$arrayElemAt
```

use karte hain.

---

Example

Before

```json
"user":[
 {
   username:"Krishna"
 }
]
```

After

```json
"user":{
   username:"Krishna"
}
```

---

# `$arrayElemAt`

Syntax

```js
$arrayElemAt:[
   "$user",
   0
]
```

Meaning

```text
User array ka first element do.
```

---

# Final Output

```json
[
 {
   user:{
      username:"Krishna",
      avatar:"..."
   },

   role:"Admin"
 }
]
```

---

# 4️⃣ Update Member Role

Question

Rahul Member hai.

Usko Admin banana hai.

Flow

```text
UserID

↓

ProjectID

↓

Find ProjectMember

↓

Role Update

↓

Success
```

---

## Step 1

Role valid hai?

```js
availableUserRoles.includes(role)
```

Suppose

Role

```text
CEO
```

Allowed nahi hai.

↓

400

---

## Step 2

Find

```text
Project + User
```

Kyuki ek hi user multiple projects me ho sakta hai.

Example

```text
Rahul

↓

Portfolio

↓

Member
```

Aur

```text
Rahul

↓

Hospital

↓

Admin
```

Sirf User ID se nahi chalega.

Project bhi chahiye.

---

## Step 3

Update

```js
findByIdAndUpdate()
```

Role

↓

Member

↓

Admin

---

# 5️⃣ Delete Member

Almost same.

Difference sirf

Instead of

```js
findByIdAndUpdate()
```

we write

```js
findByIdAndDelete()
```

Flow

```text
Project

↓

User

↓

Find Membership

↓

Delete Membership

↓

Success
```

User delete nahi hota.

Sirf

ProjectMember document delete hota hai.

Example

Before

```text
Rahul

↓

Portfolio
```

Delete

↓

After

```text
Rahul

Not Part Of Portfolio
```

Lekin Rahul account abhi bhi Users collection me hai.

---

# Sabse Important Concept

Is lecture ka hidden lesson ye nahi tha ki controllers kaise likhne hain.

Hidden lesson tha

```text
Relationship Tables
```

Ye ProjectMember collection dekh rahe ho?

Ye SQL me hota

```sql
ProjectMembers

UserID

ProjectID

Role
```

Isko SQL me bolte hain

```text
Junction Table
```

MongoDB me bhi exactly wahi concept ObjectId references ke saath implement kiya gaya hai.

---

# Lecture ka Complete Flow

```text
Create Project
        │
        ▼
Project Collection

        │
        ▼
Add Member
        │
        ▼
ProjectMember Collection

        │
        ▼
Get Members
        │
        ▼
Aggregation

        │
        ▼
Update Role

        │
        ▼
Delete Member
```

---

# Interview Questions

### Why use ProjectMember collection?

Because one project has many users, one user can belong to many projects, and each membership has extra information like `role`. That's a classic **many-to-many relationship**.

---

### Why `upsert:true`?

If the matching document exists, update it. If it doesn't exist, create a new one.

---

### Why use Aggregation instead of `populate()` here?

Because we want to **join data and reshape/filter it** (e.g., only username, avatar, full name), which aggregation handles more flexibly.

---

### Why use `$arrayElemAt`?

`$lookup` always returns an array. If you know there is only one matching document, `$arrayElemAt` extracts that single object from the array.

---

Is lecture me sirf **ek naya MongoDB concept** introduce hua hai:

* `upsert`
* `$arrayElemAt`


