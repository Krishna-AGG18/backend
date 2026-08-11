import mongoose from "mongoose";
import { User } from "./src/models/user.models.js";
import dotenv from "dotenv";

dotenv.config();

async function testApiLoginVerified() {
    try {
        console.log("Starting test...");
        
        const newEmail = "api" + Date.now() + "@test.com";
        const password = "password123";

        // 1. Register
        const regRes = await fetch('http://localhost:8080/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: newEmail,
                username: "apiuser" + Date.now(),
                password: password,
                fullName: "API Test User"
            })
        });
        const regData = await regRes.json();
        
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email: newEmail });
        
        user.isEmailVerified = true;
        await user.save({ validateBeforeSave: false });

        console.log("Attempting Login after verifying email manually...");
        const loginRes = await fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: newEmail,
                password: password
            })
        });

        const loginData = await loginRes.json();
        console.log("Login Response Status:", loginRes.status);
        console.log("Login Response Data:", loginData);
        process.exit(0);

    } catch (error) {
        console.error("API Error!", error);
        process.exit(1);
    }
}

testApiLoginVerified();
