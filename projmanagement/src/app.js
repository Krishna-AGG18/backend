import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import { errorHandler } from "./middlewares/error.middleware.js";

//security
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

const swaggerDocument = JSON.parse(fs.readFileSync(new URL("./swagger.json", import.meta.url)));
const app = express();

app.use(morgan("dev")); // Log all incoming HTTP requests to the console

// app.use middleware - BASIC CONFIGURATION

//to accept json data
app.use(express.json({ limit: "16kb" }));

//to accept data from url + encoding like spaces into %20 and all
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// to make public folder publicly viewable such that i can serve content from it directly
app.use(express.static("public"));

// 1. Set security HTTP headers
app.use(helmet());

// 2. Limit requests from same API (Rate Limiting)
// Ye rule banayega ki 15 minute me ek IP se 100 se zyada requests na aayein
const limiter = rateLimit({
    max: 100, 
    windowMs: 15 * 60 * 1000, 
    message: "Too many requests from this IP, please try again in an hour!"
});
app.use("/api", limiter);

// 3. Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// 4. Data sanitization against XSS (Cross-Site Scripting)
// (xss-clean is currently incompatible with Express v5, so we temporarily disable it)
// app.use(xss());

// cookie-parser : now we have access to cookies
app.use(cookieParser())


// CORS CONFIGURATION
app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

// import the routes

import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";
import noteRouter from "./routes/notes.routes.js";
import activityRouter from "./routes/activity.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/notes", noteRouter);
app.use("/api/v1/activities", activityRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/dashboard", dashboardRouter);

// Swagger Documentation Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.send("Welcome to base camp!");
});

app.get("/instagram", (req, res) => {
    res.send("Welcome to base camp's insta page!");
});

// Global error handler should be the last middleware added
app.use(errorHandler);

export default app;
