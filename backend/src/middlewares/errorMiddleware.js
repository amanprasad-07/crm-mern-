export const errorHandler = (err, req, res, next) => {
  // Standardized error response middleware.
  // Ensures consistent error formatting across the entire API.

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "server error",

  });
};
