# Backend Auth Course Notes — Forgot Password, Reset Password & Change Password

Based on the lecture transcript 

---

# Where We Are In The Authentication Flow

So far, the course has already implemented:

```text
Register User
    ↓
Email Verification
    ↓
Login User
    ↓
JWT Generation
    ↓
Cookie Storage
    ↓
Protected Routes
```

Now we're implementing the remaining password-related features:

```text
1. Forgot Password
2. Reset Password
3. Change Password
```

These three look similar but solve different problems.

---

# Important Difference

## Forgot Password

User is NOT logged in.

```text
User Forgot Password
        ↓
Enter Email
        ↓
Server Verifies Email
        ↓
Generates Reset Token
        ↓
Stores Hashed Token
        ↓
Sends Email
```

No password changes happen here.

---

## Reset Password

User clicks email link.

```text
Email Link
      ↓
Contains Reset Token
      ↓
User Opens Reset Page
      ↓
Enters New Password
      ↓
Server Validates Token
      ↓
Updates Password
```

Actual password change happens here.

---

## Change Password

User is already logged in.

```text
Logged In User
      ↓
Enter Old Password
      ↓
Enter New Password
      ↓
Verify Old Password
      ↓
Update Password
```

No email required.

---

# 1. Forgot Password Controller

## Purpose

Generate a temporary password reset token and send it to the user's email.

---

## Request

```http
POST /forgot-password
```

Body:

```json
{
  "email": "john@gmail.com"
}
```

---

# Step 1: Extract Email

```js
const { email } = req.body;
```

### Why?

User enters email on forgot-password form.

Frontend:

```text
┌────────────────────┐
│ john@gmail.com     │
└────────────────────┘
       Submit
```

Email reaches server through request body.

---

# Step 2: Find User

```js
const user = await User.findOne({ email });
```

### What happens?

MongoDB query:

```js
db.users.findOne({
  email: "john@gmail.com"
})
```

---

## Why?

Before sending reset email we must ensure:

```text
User Exists
```

Otherwise anybody could request password reset for non-existing accounts.

---

# Step 3: User Validation

```js
if (!user) {
    throw new ApiError(
        404,
        "User does not exist"
    );
}
```

---

## Why 404?

```text
Requested User
Not Found
```

Database returned:

```js
null
```

---

# Step 4: Generate Temporary Token

```js
const {
  unHashedToken,
  hashedToken,
  tokenExpiry
} = user.generateTemporaryToken();
```

---

# What Is Happening?

Previously we created this model method:

```js
user.generateTemporaryToken()
```

It returns:

```js
{
   unHashedToken,
   hashedToken,
   tokenExpiry
}
```

---

# Why Two Tokens?

## Unhashed Token

Used inside email.

```text
User receives this token
```

Example:

```text
abc123xyz
```

---

## Hashed Token

Stored in database.

```text
SHA256(abc123xyz)
```

Example:

```text
7d7f8a9b...
```

---

# Security Reason

Never store raw tokens.

Same philosophy as passwords.

```text
Password
      ↓
Hash
      ↓
Store
```

Same:

```text
Reset Token
      ↓
Hash
      ↓
Store
```

If database leaks:

```text
Attacker can't use token directly
```

---

# Step 5: Save Token & Expiry

```js
user.forgotPasswordToken = hashedToken;
user.forgotPasswordExpiry = tokenExpiry;
```

Database becomes:

```json
{
  "_id": "...",
  "email": "john@gmail.com",
  "forgotPasswordToken": "7d7f8a9b...",
  "forgotPasswordExpiry": 1714567890
}
```

---

# Why Expiry?

Without expiry:

```text
Email sent today
Email clicked after 2 years
```

Still valid.

Bad security.

---

Typical expiry:

```text
10 min
15 min
30 min
1 hour
```

---

# Step 6: Save User

```js
await user.save({
  validateBeforeSave: false
});
```

---

## Why disable validation?

We are updating only:

```js
forgotPasswordToken
forgotPasswordExpiry
```

Not changing:

```js
email
password
username
```

Running full validation is unnecessary.

---

# Step 7: Send Email

```js
await sendEmail({
   email: user.email,
   subject: "Password Reset Request",
   mailgenContent:
      forgotPasswordMailgenContent(...)
});
```

---

# Email Flow

```text
User Email
      ↓
Server Generates Token
      ↓
Stores Hashed Token
      ↓
Creates Email
      ↓
Sends Reset Link
```

---

# Reset URL

Example:

```js
${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}
```

Generated URL:

```text
https://frontend.com/forgot-password/abc123xyz
```

---

# Why Send Unhashed Token?

Because later:

```text
User clicks link
```

Browser sends:

```text
abc123xyz
```

Then server hashes it again and compares with database.

Exactly same idea as password hashing.

---

# Response

```js
return res.status(200).json(
  new ApiResponse(
     200,
     {},
     "Password reset mail has been sent"
  )
);
```

---

# Forgot Password Flow Diagram

```text
User
  ↓
Enter Email
  ↓
POST /forgot-password
  ↓
Find User
  ↓
Generate Token
  ↓
Hash Token
  ↓
Store Hash
  ↓
Send Email
  ↓
Success Response
```

---

# 2. Reset Password Controller

This is the most important part.

---

# Purpose

Actually change the password.

---

## Request

URL:

```http
POST /reset-password/:token
```

Example:

```http
POST /reset-password/abc123xyz
```

Body:

```json
{
  "newPassword": "password123"
}
```

---

# Step 1: Get Token & Password

```js
const { resetToken } = req.params;
const { newPassword } = req.body;
```

---

# Why Two Sources?

Token comes from URL.

```text
/reset-password/abc123xyz
```

Password comes from body.

```json
{
  "newPassword": "123456"
}
```

---

# Step 2: Hash Incoming Token

```js
const hashedToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");
```

---

# Why?

Database stores:

```text
hashedToken
```

User sends:

```text
unhashedToken
```

To compare both:

```text
Incoming Token
      ↓
Hash Again
      ↓
Compare With DB
```

---

# Step 3: Find User

```js
const user = await User.findOne({
   forgotPasswordToken: hashedToken,
   forgotPasswordExpiry: {
      $gt: Date.now()
   }
});
```

---

# Two Conditions

## Condition 1

```js
forgotPasswordToken === hashedToken
```

Correct token.

---

## Condition 2

```js
forgotPasswordExpiry > Date.now()
```

Token not expired.

---

# Database Query

```js
{
  forgotPasswordToken: hashedToken,
  forgotPasswordExpiry: {
      $gt: currentTime
  }
}
```

---

# Step 4: Invalid Token

```js
if (!user) {
   throw new ApiError(
      400,
      "Token is invalid or expired"
   );
}
```

---

# Cases

### Wrong Token

```text
Link Modified
```

---

### Expired Token

```text
Generated 1 hour ago
Expired after 15 min
```

---

# Step 5: Remove Token Data

```js
user.forgotPasswordToken = undefined;
user.forgotPasswordExpiry = undefined;
```

---

# Why?

One-time use token.

After password reset:

```text
Token Must Die
```

Otherwise:

```text
Same Email Link
Can Be Reused
```

Huge security issue.

---

# Step 6: Update Password

```js
user.password = newPassword;
```

---

# Important Interview Concept

Notice:

```js
No bcrypt here
```

Why?

Because model hook handles it.

---

# Mongoose Pre Save Hook

Earlier:

```js
userSchema.pre("save", async function() {
   ...
});
```

Whenever password changes:

```js
this.password = bcrypt.hash(...)
```

Automatically.

---

# Flow

```text
newPassword
      ↓
user.password
      ↓
save()
      ↓
pre save hook
      ↓
bcrypt hash
      ↓
database
```

---

# Step 7: Save

```js
await user.save({
   validateBeforeSave: false
});
```

---

# Step 8: Response

```js
Password reset successfully
```

---

# Reset Password Complete Flow

```text
Email Link
      ↓
Token Received
      ↓
Hash Token
      ↓
Find User
      ↓
Verify Expiry
      ↓
Set New Password
      ↓
Hash Password
      ↓
Remove Token
      ↓
Save User
      ↓
Success
```

---

# 3. Change Password Controller

Different from Reset Password.

---

# Purpose

Logged-in user wants to change password.

Example:

```text
Settings Page
      ↓
Change Password
```

---

# Request

```json
{
   "oldPassword": "old123",
   "newPassword": "new123"
}
```

---

# Step 1: Extract Data

```js
const {
  oldPassword,
  newPassword
} = req.body;
```

---

# Step 2: Get Current User

```js
const user = await User.findById(
   req.user._id
);
```

---

# Important

Where did `req.user` come from?

Authentication middleware.

Earlier flow:

```text
JWT Cookie
      ↓
Auth Middleware
      ↓
Verify Token
      ↓
req.user = user
      ↓
Controller
```

---

# Middleware Chain

```text
Request
   ↓
verifyJWT
   ↓
req.user attached
   ↓
changePassword
```

---

# Step 3: Verify Old Password

```js
const isPasswordValid =
   await user.isPasswordCorrect(
      oldPassword
   );
```

---

# What Happens Internally?

```js
bcrypt.compare(
   oldPassword,
   hashedPassword
);
```

Returns:

```js
true
```

or

```js
false
```

---

# Step 4: Reject Wrong Password

```js
if (!isPasswordValid) {
   throw new ApiError(
      400,
      "Invalid old password"
   );
}
```

---

# Why?

Anyone using your session should still know current password.

Extra security layer.

---

# Step 5: Update Password

```js
user.password = newPassword;
```

---

# Step 6: Save

```js
await user.save({
   validateBeforeSave: false
});
```

Pre-save hook hashes password again.

---

# Step 7: Response

```js
Password changed successfully
```

---

# Change Password Flow

```text
JWT Verified
      ↓
Get User
      ↓
Verify Old Password
      ↓
Set New Password
      ↓
Hash Password
      ↓
Save
      ↓
Success
```

---

# Interview Questions

### Authentication vs Authorization

Authentication:

```text
Who are you?
```

Authorization:

```text
What can you access?
```

---

### Forgot Password vs Change Password

Forgot Password:

```text
Not Logged In
Uses Email Token
```

Change Password:

```text
Logged In
Uses Old Password
```

---

### Why Hash Reset Tokens?

```text
Database Leak Protection
```

Same reason we hash passwords.

---

### Why Remove Reset Token After Use?

```text
One Time Usage
```

Prevents replay attacks.

---

### Why Use Expiry Time?

```text
Limits Attack Window
```

---

# Common Mistakes

### ❌ Storing raw token in DB

```js
user.resetToken = token;
```

### ✅ Store hash

```js
user.resetToken =
   sha256(token);
```

---

### ❌ Not checking expiry

```js
findOne({ token });
```

### ✅ Check expiry

```js
findOne({
 token,
 expiry: { $gt: Date.now() }
});
```

---

### ❌ Forgetting to delete token

Allows reuse.

### ✅

```js
user.forgotPasswordToken = undefined;
user.forgotPasswordExpiry = undefined;
```

---

# Auth System Progress Tracker

```text
✓ User Model
✓ Password Hashing
✓ JWT Generation
✓ Register User
✓ Email Verification
✓ Login User
✓ Logout User
✓ Forgot Password
✓ Reset Password
✓ Change Password
✓ Protected Routes

Next:
→ Route Definitions
→ Middleware Wiring
→ API Testing
```

This lecture completes the entire password-management part of the authentication system and heavily reuses the earlier concepts of **temporary tokens, hashing, Mongoose hooks, JWT middleware, and email workflows**.
