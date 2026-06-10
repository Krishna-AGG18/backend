## 1. `getCurrentUser()`

### Purpose

Return details of the currently logged-in user.

---

### Code

```js
export const getCurrentUser = asyncHandler(
  async (req, res) => {
    return res.status(200).json(
      new ApiResponse(
        200,
        req.user,
        "Current user fetched successfully"
      )
    );
  }
);
```

---

### Explanation

#### `req.user`

Comes from:

```js
verifyJWT
```

middleware.

Flow:

```text
Access Token
     ↓
verifyJWT
     ↓
Token Decoded
     ↓
User Fetched
     ↓
req.user Created
     ↓
getCurrentUser()
```

So:

```js
req.user
```

already contains:

```js
{
  _id,
  username,
  email,
  role
}
```

No database query needed.

---

## 2. `verifyEmail()`

### Purpose

User clicks:

```text
localhost:8000/api/v1/auth/verify-email/abc123
```

Verify ownership of email.

---

### Step 1: Get Token From URL

```js
const { verificationToken } = req.params;
```

---

### Why `req.params`?

Route:

```js
router.get(
  "/verify-email/:verificationToken",
  verifyEmail
);
```

URL:

```text
/verify-email/abc123
```

Result:

```js
req.params = {
  verificationToken: "abc123"
}
```

---

### Step 2: Check Token Exists

```js
if (!verificationToken) {
  throw new ApiError(
    400,
    "Verification token missing"
  );
}
```

---

### Step 3: Hash Incoming Token

Database stores:

```text
HASHED TOKEN
```

Email contains:

```text
RAW TOKEN
```

Convert again:

```js
const hashedToken =
  crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
```

---

### Why?

Because database contains:

```text
98abfcd234....
```

not:

```text
abc123
```

Hashing makes both match.

---

### Step 4: Find User

```js
const user = await User.findOne({
  emailVerificationToken: hashedToken,

  emailVerificationExpiry: {
    $gt: Date.now()
  }
});
```

---

### `$gt`

Means:

```text
Greater Than
```

Check:

```text
expiry > currentTime
```

If true:

```text
Token Valid
```

If false:

```text
Token Expired
```

---

### Step 5: Verify User

```js
user.isEmailVerified = true;
```

Changes:

```text
false
  ↓
true
```

---

### Step 6: Cleanup

```js
user.emailVerificationToken = undefined;

user.emailVerificationExpiry = undefined;
```

No need to keep old verification data.

---

### Step 7: Save

```js
await user.save({
  validateBeforeSave: false
});
```

Save updated user.

---

### Step 8: Response

```js
return res.status(200).json(
  new ApiResponse(
    200,
    {
      isEmailVerified: true
    },
    "Email verified successfully"
  )
);
```

---

## 3. `resendEmailVerification()`

### Purpose

User didn't verify within 20 minutes.

Needs a new email.

---

### Step 1: Get Current User

```js
const user = await User.findById(
  req.user._id
);
```

`req.user` comes from:

```js
verifyJWT
```

---

### Step 2: Check User Exists

```js
if (!user) {
  throw new ApiError(
    404,
    "User does not exist"
  );
}
```

---

### Step 3: Check Already Verified

```js
if (user.isEmailVerified) {
  throw new ApiError(
    409,
    "Email already verified"
  );
}
```

No need to resend.

---

### Step 4: Generate New Token

```js
const {
  unHashedToken,
  hashedToken,
  tokenExpiry
} =
user.generateTemporaryToken();
```

Generated:

```text
Raw Token
Hashed Token
Expiry Time
```

---

### Step 5: Store In DB

```js
user.emailVerificationToken =
  hashedToken;

user.emailVerificationExpiry =
  tokenExpiry;
```

---

### Step 6: Save

```js
await user.save({
  validateBeforeSave: false
});
```

---

### Step 7: Send Email

```js
await sendEmail(...)
```

Same email logic as registration.

---

### Step 8: Response

```js
return res.status(200).json(
  new ApiResponse(
    200,
    {},
    "Verification email sent"
  )
);
```

---

## 4. `refreshAccessToken()`

### Purpose

Access Token expired.

Generate new Access Token using Refresh Token.

---

### Flow

```text
Access Token Expired
         ↓
Client Sends Refresh Token
         ↓
Server Validates
         ↓
Generate New Tokens
         ↓
Update Database
         ↓
Send New Cookies
```

---

### Step 1: Get Refresh Token

```js
const incomingRefreshToken =
  req.cookies.refreshToken ||
  req.body.refreshToken;
```

Can come from:

```text
Cookie
OR
Body
```

---

### Step 2: Check Exists

```js
if (!incomingRefreshToken)
```

Without refresh token:

```text
Cannot Refresh Session
```

---

### Step 3: Decode Token

```js
const decodedToken =
  jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
```

---

### What Does Verify Do?

```text
Check Signature
Check Expiry
Decode Payload
```

Returns:

```js
{
  _id: "123"
}
```

---

### Step 4: Find User

```js
const user =
  await User.findById(
    decodedToken._id
  );
```

---

### Why?

Need to ensure:

```text
User Still Exists
```

---

### Step 5: Compare Refresh Token

```js
if (
 incomingRefreshToken !==
 user.refreshToken
)
```

---

### Why?

Suppose:

```text
User Logged Out
```

Database refresh token:

```text
null
```

Old token becomes invalid.

---

### Step 6: Generate New Tokens

```js
const {
  accessToken,
  refreshToken
} =
await generateAccessAndRefreshTokens(
  user._id
);
```

Creates:

```text
New Access Token
New Refresh Token
```

---

### Step 7: Update Database

```js
user.refreshToken =
  refreshToken;
```

Store latest refresh token.

---

### Step 8: Save

```js
await user.save();
```

---

### Step 9: Set Cookies

```js
.cookie(
  "accessToken",
  accessToken,
  options
)
```

Stores:

```text
New Access Token
```

---

```js
.cookie(
  "refreshToken",
  refreshToken,
  options
)
```

Stores:

```text
New Refresh Token
```

---

### Step 10: Response

```js
return res.status(200)
.cookie(...)
.cookie(...)
.json(
  new ApiResponse(
    200,
    {
      accessToken,
      refreshToken
    },
    "Access token refreshed"
  )
);
```

---

# Complete Authentication Flow So Far

```text
REGISTER
   ↓
Create User
   ↓
Generate Verification Token
   ↓
Send Email

VERIFY EMAIL
   ↓
Hash Token
   ↓
Match Database
   ↓
Mark Verified

LOGIN
   ↓
Check Email
   ↓
Check Password
   ↓
Generate Tokens
   ↓
Set Cookies

GET CURRENT USER
   ↓
verifyJWT
   ↓
req.user
   ↓
Return User

REFRESH TOKEN
   ↓
Verify Refresh Token
   ↓
Generate New Tokens
   ↓
Update DB
   ↓
Set New Cookies

LOGOUT
   ↓
Remove Refresh Token
   ↓
Clear Cookies
   ↓
Response
```

The uploaded notes discuss these controllers and their role in the auth workflow. 
