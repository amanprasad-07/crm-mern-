import mongoose from 'mongoose';

// Establishes a connection to MongoDB using the URI from environment variables.
// If the connection fails, the server is terminated to prevent running in an invalid state.
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");

  } catch (error) {
    console.error("Database connection failed:", error.message);

    // Exit process to avoid serving API routes without a working database.
    process.exit(1);
  }
};
