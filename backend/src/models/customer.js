import mongoose from "mongoose";

// Customer schema defining the structure of customer documents in MongoDB.
// Includes core contact fields, metadata, and ownership link to the user who created it.
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true, // ensures no duplicate customer emails
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

    notes: {
      type: String,
      trim: true
    },

    // Associates each customer with the authenticated user who created it.
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    // Enables automatic createdAt and updatedAt timestamps.
    timestamps: true
  }
);

// Export compiled Customer model for queries and CRUD operations.
export default mongoose.model("Customer", customerSchema);
