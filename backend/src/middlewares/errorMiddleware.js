export const errorHandler = (err, req, res, next) => {
  // Standardized error response middleware.
  // Ensures consistent error formatting across the entire API.

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "server error",

    // Expose stack trace only in non-production environments for safer debugging.
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
};
