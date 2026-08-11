import mongoose from "mongoose";
import { User } from "./src/models/user.models.js";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB");

  const email = "testauth" + Date.now() + "@test.com";
  const password = "password123";

  // Register
  const user = await User.create({
      email,
      password,
      username: "testauth" + Date.now(),
      fullName: "Test Auth",
      isEmailVerified: false,
  });

  const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  console.log("User created:", user.email);
  
  // Try Login
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
      console.log("User not found!");
      process.exit(1);
  }

  const isValid = await foundUser.isPasswordCorrect(password);
  console.log("Password is valid:", isValid);
  
  process.exit(0);
}

run().catch(console.error);
