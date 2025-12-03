import mongoose from "mongoose";

// User schema representing registered system users.
// Stores identity details and hashed authentication credentials.
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true // normalize whitespace around names
    },

    email: {
      type: String,
      required: true,
      unique: true // ensures one account per email
    },

    password: {
      type: String,
      required: true // hashed password stored here
    }
  },
  {
    // Automatically append createdAt and updatedAt fields.
    timestamps: true
  }
);

// Export compiled User model for authentication and authorization logic.
export default mongoose.model("User", userSchema);
