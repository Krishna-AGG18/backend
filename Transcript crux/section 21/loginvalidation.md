# Login Validation & Testing Revision

### 1. Added Login Validator

In `validators/index.js`:

```js
export const userLoginValidator = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Email is invalid"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
  ];
};
```

Purpose:

* Validate email format
* Ensure password is provided

---

### 2. Export Validator

```js
export {
  userRegisterValidator,
  userLoginValidator
};
```

---

### 3. Use Validator in Route

```js
router.post(
  "/login",
  userLoginValidator(),
  validate,
  login
);
```

Flow:

```text
Request
 ↓
userLoginValidator()
 ↓
validate middleware
 ↓
login controller
```

If validation fails:

```json
{
  "success": false,
  "message": "Received data is not valid"
}
```

Controller never executes.

---

### 4. Postman Login Request

Endpoint:

```http
POST /api/v1/auth/login
```

Body:

```json
{
  "email": "one@1.com",
  "password": "123456"
}
```

---

### 5. Successful Response

```json
{
  "statusCode": 200,
  "data": {
    "user": {},
    "accessToken": "...",
    "refreshToken": "..."
  },
  "message": "User logged in successfully"
}
```

---

### 6. Cookies Created

Browser/Postman receives:

```text
accessToken
refreshToken
```

Set using:

```js
res.cookie("accessToken", accessToken, options)
res.cookie("refreshToken", refreshToken, options)
```

Options:

```js
const options = {
  httpOnly: true,
  secure: true
};
```

---

### 7. Final Login Flow

```text
POST /login
      ↓
Validation
      ↓
Find User
      ↓
Check Password
      ↓
Generate Access Token
      ↓
Generate Refresh Token
      ↓
Save Refresh Token in DB
      ↓
Set Cookies
      ↓
Return User + Tokens
```

### What Was Verified?

✅ Login route works

✅ Validation works

✅ Access token generated

✅ Refresh token generated

✅ Cookies set successfully

✅ Postman receives tokens

✅ User logged in successfully response returned
