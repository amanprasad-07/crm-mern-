import express from 'express';
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomer,
  searchCustomers,
  updateCustomer
} from '../controller/customerController.js';
import { protect } from '../middlewares/authMiddleware.js';

// Router managing all customer-related operations.
// All routes are protected to ensure only authenticated users can access them.
export const customerRouter = express.Router();

// Retrieve customers, optionally filtered by search query.
// Example: GET /customers?search=john
customerRouter.get('/', protect, searchCustomers);

// Retrieve a single customer record by ID.
customerRouter.get('/:id', protect, getCustomer);

// Create a new customer entry.
customerRouter.post('/', protect, createCustomer);

// Update an existing customer’s details using their ID.
customerRouter.put('/:id', protect, updateCustomer);

// Permanently remove a customer record.
customerRouter.delete('/:id', protect, deleteCustomer);
