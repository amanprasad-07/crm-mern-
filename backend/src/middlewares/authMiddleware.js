import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Authorization middleware to protect private routes.
// Validates JWT from cookies or Authorization header and attaches user data to req.user.
export const protect = async (req, res, next) => {
  try {
    let token;

    // Extract token from signed cookie if available.
    if (req.cookies.token) {
      token = req.cookies.token;

    // Fallback: support Authorization: Bearer <token> format.
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token means user is not authenticated.
    if (!token) {
      const error = new Error("Not authorized, token missing");
      error.statusCode = 401;
      return next(error);
    }

    // Verify token integrity and extract payload.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Look up authenticated user and attach to request for downstream controllers.
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    next();

  } catch (error) {
    // Handle invalid, expired, or tampered tokens.
    error.statusCode = 401;
    next(error);
  }
};
