import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDb } from './config/db.js';
import { registerRouter } from './routes/authRoute.js';
import { customerRouter } from './routes/userRoute.js';
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

// Parse incoming JSON bodies for APIs.
app.use(express.json());

// Configure CORS to allow frontend (Vite: localhost:5173) to send cookies.
// Required for secure cookie-based JWT authentication.
app.use(
  cors({
    origin: "https://crm-mern-git-main-amanprasad-07s-projects.vercel.app",
    credentials: true,
  })
);

// Load environment variables (DB credentials, PORT, JWT keys, etc.)
dotenv.config();

// Parse cookies on incoming requests so that authentication middlewares
// can access tokens stored in cookies.
app.use(cookieParser());

// Route mounting: authentication and customer management modules.
app.use('/api/auth', registerRouter);
app.use('/api/customers', customerRouter);

// Global error handler for structured error responses.
app.use(errorHandler);

// Initialize database connection before serving requests.
connectDb();

// Start server on configured port.
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
