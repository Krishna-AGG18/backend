import { ApiErrors } from "../utils/api-errors.js";

const errorHandler = (err, req, res, next) => {
    let error = err;

    // If the error is not an instance of our custom ApiErrors, convert it
    if (!(error instanceof ApiErrors)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Something went wrong";
        error = new ApiErrors(statusCode, message, error?.errors || [], error.stack);
    }

    // Prepare the response payload
    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // Only send stack trace in development
    };

    // Send the response
    return res.status(error.statusCode).json(response);
};

export { errorHandler };
