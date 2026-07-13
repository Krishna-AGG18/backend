---
# 📍 Where We Are

Ab tak humne likh liya tha:

```text
Models ✅

Controllers ✅

Middleware ✅
```

Ab bacha hai

```text
Validators
```

Architecture ab kuch aisa ban gaya hai

```text
Request

↓

Route

↓

Validator  ← Today's Lecture

↓

verifyJWT

↓

Permission Middleware

↓

Controller

↓

Database
```

Notice

Controller se pehle hi validation ho rahi hai.

---

# Why Validators?

Maan lo frontend ye request bhejta hai

```json
{
    "name": ""
}
```

Ab socho.

Controller ke andar agar validation nahi hogi

to kya hoga?

```text
Controller

↓

Project.create()

↓

Database
```

Database me

```json
{
   "name":""
}
```

save ho sakta hai.

Ye galat hai.

---

Validator ka kaam hai

```text
Request

↓

Data Check

↓

Valid ?

↓

YES

↓

Controller

↓

NO

↓

400 Error
```

Controller tak hi nahi jaane dena.

---

# Validator 1

## Create Project Validator

Controller

```text
POST /projects
```

Frontend

```json
{
    "name":"Portfolio",
    "description":"Backend API"
}
```

---

### First Validation

```js
body("name")
```

Meaning

Request body me

```json
{
   "name":"Portfolio"
}
```

wala field uthao.

---

### `.notEmpty()`

```js
.notEmpty()
```

Meaning

Ye empty nahi hona chahiye.

Valid

```json
{
   "name":"Portfolio"
}
```

Invalid

```json
{
   "name":""
}
```

---

### `.withMessage()`

```js
.withMessage("Name is required")
```

Agar validation fail hui

to response

```json
{
   "message":"Name is required"
}
```

---

### Description

```js
body("description")
```

Description required nahi hai.

Isliye

```js
.optional()
```

Meaning

Agar user bheje

↓

Validate.

Agar nahi bheje

↓

Ignore.

Example

Valid

```json
{
   "name":"Portfolio"
}
```

Valid

```json
{
   "name":"Portfolio",

   "description":"Backend"
}
```

Dono chalenge.

---

# Validator 2

## Add Member Validator

Request

```json
{
   "email":"rahul@gmail.com",

   "role":"MEMBER"
}
```

---

### Email

```js
body("email")
```

Request body se email uthao.

---

### `.trim()`

```js
.trim()
```

Suppose user bhejta hai

```text
"   krishna@gmail.com   "
```

Trim

↓

```text
krishna@gmail.com
```

Spaces remove.

---

### `.notEmpty()`

Email compulsory hai.

---

### `.isEmail()`

Ye express-validator ka built-in validator hai.

Valid

```text
krishna@gmail.com
```

Invalid

```text
krishna
```

Invalid

```text
abc123
```

Invalid

```text
gmail.com
```

---

### Role

```js
body("role")
```

Role bhi compulsory.

---

### `.notEmpty()`

Role blank nahi hona chahiye.

---

# New Thing

## `isIn()`

Ye lecture ka sirf ek naya concept hai.

```js
.isIn(availableUserRoles)
```

Question

Ye karta kya hai?

---

Suppose

Constants

```js
const availableUserRoles=[
   "ADMIN",

   "MANAGER",

   "MEMBER"
];
```

Frontend bhejta hai

```json
{
   "role":"ADMIN"
}
```

Check

```text
ADMIN

Array me hai?
```

YES

↓

Pass.

---

Frontend bhejta hai

```json
{
   "role":"CEO"
}
```

Check

```text
CEO

Array me hai?
```

NO

↓

Fail.

---

Exactly

```js
availableUserRoles.includes(role)
```

jaisa.

---

Visual

```text
Array

↓

ADMIN

MANAGER

MEMBER
```

Request

```text
ADMIN
```

↓

Found

↓

Success

---

Request

```text
CEO
```

↓

Not Found

↓

Validation Failed

---

# `availableUserRoles`

Ye kahan se aa raha hai?

Instructor constants file se import kar raha hai.

Example

```js
export const availableUserRoles=[

"ADMIN",

"MANAGER",

"MEMBER"

];
```

Ab poori application me

ek hi source hai.

Kal agar

```text
SUPERVISOR
```

add karna ho

Sirf constants file change hogi.

Pure project me automatically update.

Ye production best practice hai.

---

# Request Lifecycle

Create Project

```text
Frontend

↓

POST /projects

↓

Validator

↓

Name Empty?

↓

YES

↓

400

↓

NO

↓

Controller
```

---

Add Member

```text
Frontend

↓

Email

↓

Valid Email?

↓

Role Valid?

↓

YES

↓

Controller
```

---

# Common Validators (Interview)

```js
.notEmpty()
```

Field blank nahi hona chahiye.

---

```js
.isEmail()
```

Valid email format.

---

```js
.optional()
```

Field optional hai.

---

```js
.trim()
```

Leading/trailing spaces remove karta hai.

---

```js
.isIn(array)
```

Value array ke andar honi chahiye.

---

# Why Validation Before Controller?

Without Validator

```text
Controller

↓

Check Name

↓

Check Email

↓

Check Role

↓

Business Logic
```

Controller bahut messy ho jayega.

---

With Validator

```text
Validator

↓

Sab checks

↓

Controller

↓

Business Logic only
```

Ye clean architecture hai.

---

# Interview Question

### Why validate role using `isIn()` instead of checking inside controller?

Because validation is **input validation**, not business logic.

Controller ka kaam project banana hai.

Validator ka kaam incoming data verify karna hai.

Ye **Separation of Concerns** ka principle follow karta hai.

---

# ⭐ CRUX (1 Minute Revision)

Is lecture me sirf do validators banaye gaye.

### Create Project Validator

✔ `name` required

✔ `description` optional

---

### Add Member Validator

✔ Email required

✔ Email format valid

✔ Role required

✔ Role predefined list (`ADMIN`, `MANAGER`, `MEMBER`) me hona chahiye

---

## 🧠 Senior Developer Insight

Is lecture ka sabse important concept **validation ko centralized rakhna** hai.

Instead of every controller doing this:

```js
if (!email) ...
if (!role) ...
if (!availableUserRoles.includes(role)) ...
```

hum ek dedicated validation layer banate hain.

Isse:

* Controllers clean rehte hain.
* Validation reusable ho jaati hai.
* Error messages consistent rehte hain.
* Agar validation rules change hon, to sirf validator update karna padta hai, controller nahi.
