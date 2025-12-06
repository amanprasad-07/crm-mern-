import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// User registration controller.
// Validates input, checks for duplicate accounts, hashes password,
// and persists a new user record.
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Field-level validation
    if (!name) {
      const error = new Error("Name is required");
      error.statusCode = 400;
      return next(error);
    }

    if (!email) {
      const error = new Error("Email is required");
      error.statusCode = 400;
      return next(error);
    }

    if (!password) {
      const error = new Error("Password is required");
      error.statusCode = 400;
      return next(error);
    }

    if (password.length < 6) {
      const error = new Error("Password must be at least 6 characters long");
      error.statusCode = 400;
      return next(error);
    }

    // Check for existing user
    const userExist = await User.findOne({ email });
    if (userExist) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      return next(error);
    }

    // Secure password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user record
    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: "Registration successful"
    });

  } catch (error) {
    next(error);
  }
};

// User login controller.
// Validates credentials, compares hashed passwords,
// issues JWT token, and stores it in an HTTP-only cookie.
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Field validation
    if (!email) {
      const error = new Error("Email is required");
      error.statusCode = 400;
      return next(error);
    }

    if (!password) {
      const error = new Error("Password is required");
      error.statusCode = 400;
      return next(error);
    }

    // Check if account exists
    const userExist = await User.findOne({ email });
    if (!userExist) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      return next(error);
    }

    // Compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, userExist.password);
    if (!passwordMatch) {
      const error = new Error("Wrong password");
      error.statusCode = 400;
      return next(error);
    }

    // Generate JWT valid for 1 day
    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Store token inside HttpOnly cookie for secure authentication
    res.cookie("token", token, {
      httpOnly: true,       // prevents client-side JavaScript from accessing the token
      secure: true,        // set true in production with HTTPS
      sameSite: "none",      // protects against CSRF attacks
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    // Respond with token + user info for client-side session handling
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: userExist._id,
        name: userExist.name,
        email: userExist.email
      }
    });

  } catch (error) {
    next(error);
  }
};
