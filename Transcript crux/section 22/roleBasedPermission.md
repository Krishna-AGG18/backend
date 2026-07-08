Ye lecture **backend architecture** ke hisaab se bahut important hai. Isme koi naya MongoDB operator nahi sikhaya gaya, balki **Authorization (RBAC - Role Based Access Control)** sikhaya gaya hai. Ye production applications ka core concept hai. 

---

# 📍 Pehle Difference Samjho

Bahut log Authentication aur Authorization ko confuse kar dete hain.

## Authentication (verifyJWT)

Question:

> **"Tum kaun ho?"**

Example

```text
Login

↓

JWT Verify

↓

Krishna
```

Bas identity verify hui.

---

## Authorization (Today's Lecture)

Question:

> **"Tum ye kaam kar sakte ho ya nahi?"**

Example

```text
Krishna

↓

Admin ?

↓

YES

↓

Delete Project
```

Aur

```text
Rahul

↓

Member ?

↓

NO

↓

403 Forbidden
```

---

# Problem Before This Middleware

Abhi tak hamare controllers aise the.

```text
Request

↓

verifyJWT

↓

Controller
```

Jo bhi login tha,

wo kar sakta tha

* Delete Project
* Add Member
* Update Role

Ye dangerous hai.

---

# After Today's Middleware

Ab flow ban gaya

```text
Request

↓

verifyJWT

↓

validateProjectPermission

↓

Controller
```

Ab har request pe permission check hogi.

---

# Real Life Example

Office me ho.

Employee card dikha diya.

Security bolti hai

> Haan tum employee ho.

Ye

```text
Authentication
```

hai.

---

Ab tum CEO cabin me ghusna chahte ho.

Guard bolta hai

> Role kya hai?

```text
Intern ❌

Manager ❌

CEO ✅
```

Ye

```text
Authorization
```

hai.

---

# Middleware ka Purpose

Instructor chahta hai

```text
Admin

↓

Delete Project
```

Allowed

---

```text
Admin

↓

Add Member
```

Allowed

---

```text
Member

↓

Delete Project
```

Not Allowed

---

Instead of har controller me

```js
if(role==="Admin")
```

likhne ke,

ek hi middleware banaya.

---

# Middleware Structure

```js
validateProjectPermission(["Admin"])
```

ya

```js
validateProjectPermission([
   "Admin",
   "Manager"
])
```

Ye middleware parameter accept karta hai.

---

# Flow

Suppose

Delete Project

Sirf Admin kar sakta hai.

Route

```js
router.delete(
   "/project/:id",

   verifyJWT,

   validateProjectPermission([
      "Admin"
   ]),

   deleteProject
)
```

Flow

```text
Request

↓

verifyJWT

↓

Admin?

↓

YES

↓

Controller

↓

Delete
```

---

# Middleware Signature

```js
export const validateProjectPermission =
(roles)=>
```

Question

Ye

```text
roles
```

kya hai?

Ye array hai.

Example

```js
[
 "Admin",
 "Manager"
]
```

Ye route wale developer pass karega.

---

# Fir AsyncHandler

```js
asyncHandler(async(req,res,next)=>{
```

Ye actual middleware hai.

---

# Step 1

```js
const {projectId}=req.params;
```

Question

Permission kis project ki check karni hai?

Obviously

Project ID chahiye.

---

# Step 2

```js
if(!projectId)
```

Agar Project ID hi nahi

to permission kis project ki check karoge?

Isliye

400

---

# Step 3

Sabse important query.

```js
ProjectMember.findOne(...)
```

Question

Project collection kyun nahi?

Because

Project collection

```text
Project Name

Description

CreatedBy
```

Role nahi rakhti.

---

Role kahan hai?

```text
ProjectMember
```

Collection me.

---

Example

```text
ProjectMembers

User

Project

Role
```

Exactly wahi chahiye.

---

# Query

```js
findOne({

project:projectId,

user:req.user._id

})
```

Meaning

Database me aisa document dhoondo

jahan

```text
Project=P1

AND

User=Krishna
```

---

Suppose

Mil gaya

```json
{
   user:"Krishna",

   project:"Portfolio",

   role:"Admin"
}
```

---

# Agar Nahi Mila

```text
Project Not Found
```

ya

User us project ka member hi nahi.

---

# Given Role

```js
const givenRole =
project.role;
```

Yaha

```text
givenRole
```

ka matlab

Database me stored role.

Example

```text
Admin
```

Ya

```text
Member
```

---

# Important Security Point

Instructor bolta hai

Main

```text
Frontend
```

par trust nahi karta.

Suppose frontend bole

```json
{
   role:"Admin"
}
```

Kya hum maan lenge?

NO.

Kyuki koi bhi Postman se bhej dega.

Isliye

Role

Database se nikala.

---

# Request User me Role Add

```js
req.user.role=
givenRole;
```

Ab future middleware

ya controller

easily

```js
req.user.role
```

use kar sakta hai.

---

# Sabse Important Line

```js
roles.includes(givenRole)
```

Example

Route bolta hai

Allowed

```text
Admin

Manager
```

Array

```js
[
 "Admin",
 "Manager"
]
```

Database se mila

```text
Member
```

Check

```js
includes("Member")
```

False.

---

Agar

Database

```text
Admin
```

return kare

```js
includes("Admin")
```

True.

---

# False Hua

```js
throw new ApiError(
403,
"Permission Denied"
)
```

403

Means

```text
Forbidden
```

Identity sahi hai.

Permission nahi hai.

---

# True Hua

```js
next()
```

Sabse important middleware concept.

```text
verifyJWT

↓

validatePermission

↓

Controller
```

`next()`

matlab

> Barrier cross.

Controller pe jao.

---

# Visual

Without next()

```text
Request

↓

Middleware

↓

STOP
```

---

With next()

```text
Request

↓

Middleware

↓

next()

↓

Controller
```

---

# Pura Flow

Suppose

Rahul

Role

```text
Member
```

Delete Project

Request

↓

verifyJWT

↓

User mil gaya

↓

Permission Middleware

↓

Database

↓

ProjectMember

↓

Role = Member

↓

Allowed Roles

```text
Admin
```

↓

Match?

NO

↓

403

Controller kabhi execute hi nahi hua.

---

Admin

Request

↓

verifyJWT

↓

Permission Middleware

↓

Role = Admin

↓

Allowed

↓

next()

↓

Delete Project

---

# CRUX (1 Minute Revision)

Middleware ka poora kaam sirf ye tha:

```text
Request Aayi

↓

Project ID nikali

↓

Database me ProjectMember document dhoonda

↓

Usme se User ka Role nikala

↓

Compare kiya

Allowed Roles

vs

Actual Role

↓

Match?

↓

YES → next()

NO → 403
```

---

# Ye Approach Industry me Kyun Use Hoti Hai?

❌ Bad

Har controller me:

```js
if(role==="Admin")
```

```js
if(role==="Manager")
```

```js
if(role==="Member")
```

Code repeat hoga.

---

✅ Good

Ek middleware

```text
validateProjectPermission()
```

Sab controllers reuse karenge.

Ye principle hai:

> **Centralized Authorization**

Ek jagah permission logic likho, har route par reuse karo.

---

# Interview Questions

### Difference between Authentication and Authorization?

* **Authentication:** User ki identity verify karna (JWT, login).
* **Authorization:** Verify karna ki authenticated user kisi action ko perform kar sakta hai ya nahi.

---

### Why store role in `ProjectMember` instead of `User`?

Kyuki ek user alag-alag projects me alag roles rakh sakta hai.

Example:

```text
Krishna

Portfolio → Admin

Ecommerce → Member

Hospital → Manager
```

Agar role `User` document me store karoge, to user ke paas sirf **ek hi role** ho sakta hai, jo is use case ke liye galat design hai. Project-specific role `ProjectMember` me rakhna scalable aur correct approach hai.
