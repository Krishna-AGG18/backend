# Backend Auth Course Notes — Validators, Routes & Auth Flow Completion (Phase 1)

Based on the lecture transcript provided.

---

# Big Picture: What This Lecture Actually Does

Until now we built:

```text
Models
    ↓
Controllers
    ↓
Utilities
    ↓
Middleware
```

But controllers were not connected to routes.

Think of it like this:

```text
Controller Exists
     ❌
Nobody Can Call It
```

Example:

```js
async function forgotPasswordRequest() {}
```

This function exists but Express doesn't know when to execute it.

This lecture connects everything together.

---

# Architecture Before This Lecture

```text
Client
   ↓
Route
   ❌ Missing
Controller
   ✓ Exists
Database
   ✓ Exists
```

---

# Architecture After This Lecture

```text
Client
   ↓
Route
   ↓
Validator
   ↓
Validation Middleware
   ↓
JWT Middleware
   ↓
Controller
   ↓
Database
   ↓
Response
```

This completes **Phase 1 Authentication System**.

---

# Why Validators Are Being Created?

Instructor creates validators for:

```text
Change Password
Forgot Password
Reset Password
```

---

# Problem Without Validators

Imagine request:

```json
{
}
```

No email.

No password.

Nothing.

Controller would still run.

---

# With Validators

Request enters:

```text
Request
   ↓
Validator
   ↓
Invalid?
   ↓
Reject Immediately
```

Controller never executes.

---

# Request Lifecycle

Without validation:

```text
Request
   ↓
Controller
   ↓
Database Query
   ↓
Error
```

---

With validation:

```text
Request
   ↓
Validator
   ↓
Validation Middleware
   ↓
Controller
```

Much cleaner.

---

# Change Password Validator

## Expected Request

```json
{
  "oldPassword": "123",
  "newPassword": "456"
}
```

---

## Validator

```js
body("oldPassword")
    .notEmpty()
```

---

### Why?

User must provide current password.

Otherwise anyone with session access could change password.

---

## Error Message

```js
.withMessage("Old password is required")
```

---

## New Password Validation

```js
body("newPassword")
   .notEmpty()
```

---

### Why?

Empty passwords should never be accepted.

---

# Forgot Password Validator

## Expected Request

```json
{
   "email":"john@gmail.com"
}
```

---

# Step 1

```js
body("email")
    .notEmpty()
```

---

# Why?

Email required to identify account.

---

# Step 2

```js
body("email")
    .isEmail()
```

---

# Why?

Prevent invalid requests.

Example:

❌

```json
{
   "email":"abc"
}
```

---

Valid:

✅

```json
{
   "email":"john@gmail.com"
}
```

---

# Reset Password Validator

Expected:

```json
{
   "newPassword":"password123"
}
```

---

Validator:

```js
body("newPassword")
    .notEmpty()
```

---

# Why No Token Validation Here?

Because token comes from URL.

Validation happens inside controller.

---

# Validator Pattern Used Everywhere

```js
body(...)
    .notEmpty()
    .withMessage(...)
```

---

# Why Separate Validator Files?

Many beginners write:

```js
if(!email)
if(!password)
if(!name)
```

inside controller.

---

Professional approach:

```text
validators/
     ↓
controllers/
```

Controller only contains business logic.

---

# Controller Responsibility

```text
Find User
Generate Token
Hash Password
Save User
```

---

# Validator Responsibility

```text
Check Inputs
Check Format
Reject Bad Data
```

---

# Route Layer Introduction

Now controllers are connected to endpoints.

---

# Express Flow

```text
Browser
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Response
```

---

# Route Categories

Instructor creates:

```text
Unsecured Routes
Secured Routes
```

---

# Unsecured Routes

Accessible without login.

```text
Register
Login
Verify Email
Forgot Password
Reset Password
Refresh Token
```

---

# Secured Routes

Require JWT.

```text
Logout
Current User
Change Password
Resend Verification
```

---

# Why Separate Them?

Makes code readable.

Any developer can immediately see:

```text
Requires Login?
```

or

```text
Public Endpoint?
```

---

# Verify Email Route

Controller uses:

```js
req.params.verificationToken
```

---

Route:

```js
/verify-email/:verificationToken
```

---

# Very Important Express Concept

```js
router.get(
   "/verify-email/:verificationToken"
)
```

creates:

```js
req.params.verificationToken
```

---

Example URL

```text
/verify-email/abc123
```

Produces:

```js
req.params = {
   verificationToken:"abc123"
}
```

---

# Interview Question

## What creates req.params?

Dynamic route segments.

Example:

```js
/users/:id
```

becomes

```js
req.params.id
```

---

# Verify Email Flow

```text
Email Link
     ↓
User Clicks
     ↓
GET /verify-email/token
     ↓
Verify Controller
     ↓
User Verified
```

---

# Refresh Token Route

Route:

```js
POST /refresh-token
```

---

Why Unsecured?

Because access token may already be expired.

User cannot provide valid access token.

Instead:

```text
Refresh Token
     ↓
Verify Refresh Token
     ↓
Generate New Access Token
```

---

# Forgot Password Route

Route:

```js
POST /forgot-password
```

---

Middleware Chain

```js
ForgotPasswordValidator
      ↓
validate
      ↓
forgotPasswordRequest
```

---

Flow

```text
Email
   ↓
Validator
   ↓
Controller
   ↓
Generate Reset Token
   ↓
Send Email
```

---

# Reset Password Route

Interesting route:

```js
/reset-password/:resetToken
```

---

Example:

```text
/reset-password/abc123xyz
```

---

Inside controller:

```js
req.params.resetToken
```

---

Flow

```text
Email Link
     ↓
Token In URL
     ↓
Validator
     ↓
Controller
     ↓
Hash Token
     ↓
Compare DB
     ↓
Reset Password
```

---

# JWT Protected Routes

Now comes the important part.

---

# Middleware Chain

```js
verifyJWT
      ↓
Controller
```

---

Example

```js
router.post(
   "/current-user",
   verifyJWT,
   getCurrentUser
)
```

---

# Request Lifecycle

```text
Request
    ↓
JWT Cookie
    ↓
verifyJWT
    ↓
Token Verified
    ↓
req.user Attached
    ↓
Controller
```

---

# How req.user Appears?

Many beginners get confused.

Controller:

```js
req.user._id
```

Where did this come from?

---

Answer:

JWT Middleware.

```js
verifyJWT
```

does:

```js
req.user = user
```

before calling:

```js
next()
```

---

# Visual Flow

```text
JWT Token
     ↓
verifyJWT
     ↓
Find User
     ↓
req.user = user
     ↓
next()
     ↓
Controller
```

---

# Current User Route

```js
/current-user
```

---

Flow

```text
JWT
   ↓
verifyJWT
   ↓
req.user
   ↓
getCurrentUser
```

---

# Change Password Route

Chain:

```js
verifyJWT
      ↓
ChangePasswordValidator
      ↓
validate
      ↓
changeCurrentPassword
```

---

Complete Flow

```text
Logged In User
      ↓
JWT Verify
      ↓
Validate Inputs
      ↓
Check Old Password
      ↓
Update Password
      ↓
Hash Password
      ↓
Save User
```

---

# Resend Verification Route

Purpose:

```text
Didn't Receive Verification Email
```

User clicks:

```text
Resend Verification
```

---

Flow

```text
Logged In User
     ↓
verifyJWT
     ↓
Generate New Verification Token
     ↓
Send Email Again
```

---

# Route Pattern You Should Remember

Every route follows:

```js
router.route(PATH).METHOD(
    middleware1,
    middleware2,
    controller
)
```

---

Example

```js
router.route("/change-password")
.post(
   verifyJWT,
   userChangePasswordValidator(),
   validate,
   changeCurrentPassword
)
```

---

# Middleware Execution Order

Extremely Important Interview Concept

```js
verifyJWT,
validator,
validate,
controller
```

runs exactly in this order.

---

Visual:

```text
Request
   ↓
verifyJWT
   ↓
validator
   ↓
validate
   ↓
controller
```

---

# Why Validation Middleware Exists Separately?

Validators only collect errors.

Example:

```js
body("email")
```

stores error.

---

Actual checking happens in:

```js
validate
```

---

Flow:

```text
Validator
      ↓
Collect Errors
      ↓
validate()
      ↓
Throw Errors
```

---

# PRD Driven Development

Instructor repeatedly references PRD.

---

PRD = Product Requirement Document

Example:

```text
Register User
Login User
Logout User
Forgot Password
Reset Password
```

---

Backend should follow PRD.

Not imagination.

Not assumptions.

---

Real Companies Work Like This

```text
Product Team
      ↓
PRD
      ↓
Backend Team
      ↓
Routes
      ↓
Controllers
```

---

# Postman Testing Strategy

Instructor now wants every endpoint tested.

---

Flow

```text
Write Controller
      ↓
Write Route
      ↓
Write Validator
      ↓
Start Server
      ↓
Create Postman Collection
      ↓
Test Endpoint
```

---

# Complete Authentication System (Phase 1)

## Public Routes

```text
POST /register
POST /login
GET  /verify-email/:token
POST /forgot-password
POST /reset-password/:token
POST /refresh-token
```

---

## Protected Routes

```text
POST /logout
POST /current-user
POST /change-password
POST /resend-email-verification
```

---

# Database Impact Summary

## Register

```text
Create User
```

---

## Verify Email

```text
isEmailVerified = true
```

---

## Forgot Password

```text
forgotPasswordToken
forgotPasswordExpiry
```

stored.

---

## Reset Password

```text
password updated
forgotPasswordToken removed
forgotPasswordExpiry removed
```

---

## Change Password

```text
password updated
```

---

# Common Mistakes

### ❌ Wrong Param Name

Route:

```js
/reset-password/:token
```

Controller:

```js
req.params.resetToken
```

Will fail.

Names must match.

---

### ❌ Forgetting verifyJWT

```js
/change-password
```

without middleware.

Anyone could call endpoint.

---

### ❌ Validator After Controller

Wrong:

```js
controller,
validator
```

Controller executes first.

---

Correct:

```js
validator,
controller
```

---

# Senior Developer Takeaway

This lecture contains very little new business logic.

The real lesson is understanding the **Express Request Pipeline**:

```text
Request
   ↓
Route
   ↓
Validator
   ↓
Validation Middleware
   ↓
JWT Middleware
   ↓
Controller
   ↓
Database
   ↓
Response
```

Everything in professional Node.js backends follows this exact architecture. This lecture is essentially the point where all previously built authentication pieces are finally wired together into a working API.
