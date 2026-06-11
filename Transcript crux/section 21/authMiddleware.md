# JWT Verification Middleware (Auth Middleware) Revision

Source: Uploaded notes 

---

## Why Auth Middleware?

Without middleware, every controller would need:

```js
Check Access Token
↓
Verify Token
↓
Find User
↓
Continue
```

Example:

```text
Profile Controller
   ↓
Check JWT

Update Controller
   ↓
Check JWT

Logout Controller
   ↓
Check JWT
```

Repeating the same code everywhere is bad.

So we create:

```text
Auth Middleware
```

and place it before protected controllers.

---

# Flow

```text
Request
   ↓
verifyJWT Middleware
   ↓
Valid Token?
   ↓
Yes
   ↓
Attach User to req.user
   ↓
next()
   ↓
Controller

No
   ↓
401 Unauthorized
```

---

# Purpose of verifyJWT

It does 4 things:

### 1. Get Token

From:

```text
Cookie
OR
Authorization Header
```

---

### Cookie

```js
req.cookies?.accessToken
```

---

### Header

```js
Authorization: Bearer TOKEN
```

Get it using:

```js
req.header("Authorization")
```

Remove Bearer:

```js
.replace("Bearer ", "")
```

---

# Middleware Structure

```js
export const verifyJWT = asyncHandler(
  async (req, res, next) => {

  }
);
```

Middleware always gets:

```js
req
res
next
```

---

# Extract Token

```js
const token =
  req.cookies?.accessToken ||
  req.header("Authorization")
     ?.replace("Bearer ", "");
```

---

# No Token

```js
if (!token) {
  throw new ApiError(
    401,
    "Unauthorized request"
  );
}
```

---

# Verify Token

Need JWT package:

```js
import jwt from "jsonwebtoken";
```

Verify:

```js
const decodedToken =
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );
```

---

# What Happens After Verification?

Remember while generating token:

```js
jwt.sign({
  _id: this._id,
  email: this.email,
  username: this.username
})
```

After decoding:

```js
decodedToken = {
  _id,
  email,
  username
}
```

You get back the same payload.

---

# Find User

```js
const user =
  await User.findById(
    decodedToken?._id
  );
```

---

# Remove Sensitive Fields

```js
.select(
 "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
)
```

---

# User Not Found

```js
if (!user) {
  throw new ApiError(
    401,
    "Invalid Access Token"
  );
}
```

---

# Attach User To Request

Most important line:

```js
req.user = user;
```

Now every next controller can access:

```js
req.user
```

without querying database again.

---

# Continue Request

```js
next();
```

Meaning:

```text
Middleware Done
↓
Move To Next Middleware
OR
Controller
```

---

# Error Handling

```js
catch(error){
  throw new ApiError(
    401,
    "Invalid Access Token"
  );
}
```

---

# Why Add User To req?

Because request object travels through entire lifecycle.

Before middleware:

```js
req = {
  body,
  headers,
  cookies
}
```

After middleware:

```js
req = {
  body,
  headers,
  cookies,
  user
}
```

Now any controller can do:

```js
req.user._id
req.user.email
req.user.username
```

---

# Example Route

```js
router.post(
  "/logout",
  verifyJWT,
  logoutUser
);
```

Flow:

```text
Request
   ↓
verifyJWT
   ↓
req.user added
   ↓
logoutUser Controller
```

Inside logout controller:

```js
console.log(req.user);
```

User information is already available.

---

# Complete Flow

```text
Client Request
      ↓
Access Token Sent
      ↓
verifyJWT Middleware
      ↓
Extract Token
      ↓
Verify JWT
      ↓
Find User
      ↓
req.user = user
      ↓
next()
      ↓
Protected Controller
      ↓
Response
```

### One-Line Summary

**verifyJWT middleware checks the access token, finds the logged-in user, stores that user in `req.user`, and only then allows the request to reach protected controllers.** 🚀
