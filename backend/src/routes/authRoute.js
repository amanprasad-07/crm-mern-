import express from 'express';
import { login, register } from '../controller/authController.js';

// Router responsible for handling authentication-related endpoints.
// Keeps auth logic encapsulated and separate from the main app.
export const registerRouter = express.Router();

// Register a new user account.
// Expects name, email, and password in request body.
registerRouter.post('/register', register);

// Authenticate a user and return session/JWT credentials.
registerRouter.post('/login', login);
