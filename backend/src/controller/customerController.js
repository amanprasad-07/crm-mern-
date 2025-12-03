import Customer from "../models/customer.js";

/*
 * Create a new customer record.
 * Associates the customer with the authenticated user using req.user.id.
 */
export const createCustomer = async (req, res, next) => {
  try {
    const { name, email, phone, address, notes } = req.body;

    const newCustomer = await Customer.create({
      name,
      email,
      phone,
      address,
      notes,
      createdBy: req.user.id // enforce per-user data ownership
    });

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: newCustomer
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Fetch all customers belonging to the authenticated user.
 * Ensures users only see their own CRM data.
 */
export const getAllCustomers = async (req, res, next) => {
  try {
    const allCustomers = await Customer.find({ createdBy: req.user.id });

    res.status(200).json({
      success: true,
      message: "Successfully retrieved all customers",
      data: allCustomers
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Fetch a single customer by ID.
 * Verifies ownership and returns 404 if the customer does not belong to the user.
 */
export const getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Found customer successfully",
      data: customer
    });

  } catch (error) {
    next(error);
  }
};

/*
 * Update an existing customer record.
 * Only fields provided in req.body are updated.
 * Ownership enforced via createdBy filter.
 */
export const updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      return next(error);
    }

    const { name, email, phone, address, notes } = req.body;

    // Update fields only if explicitly provided.
    if (name !== undefined) customer.name = name;
    if (email !== undefined) customer.email = email;
    if (phone !== undefined) customer.phone = phone;
    if (address !== undefined) customer.address = address;
    if (notes !== undefined) customer.notes = notes;

    await customer.save();

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: customer
    });

  } catch (error) {
    next(error);
  }
};

/*
 * Delete a customer record by ID.
 * Ensures the customer belongs to the authenticated user before deleting.
 */
export const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      return next(error);
    }

    await Customer.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

/*
 * Search customers by partial match on name or email.
 * Uses case-insensitive regex search and returns only records owned by the user.
 */
export const searchCustomers = async (req, res, next) => {
  try {
    const search = req.query.search || "";

    const customers = await Customer.find({
      createdBy: req.user.id,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ]
    });

    res.status(200).json({
      success: true,
      data: customers
    });

  } catch (error) {
    next(error);
  }
};
