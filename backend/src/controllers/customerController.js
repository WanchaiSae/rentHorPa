import { Customer } from "../models/associations/associations.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    return res.status(200).json({
      data: customers,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving customers", error });
  }
};

export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (customer) {
      return res.status(200).json({ data: customer });
    } else {
      return res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving customer", error });
  }
};

export const createCustomer = async (req, res) => {
  const { first_name, last_name, phone, email, id_card, line_id } = req.body;

  try {
    const newCustomer = await Customer.create({
      first_name,
      last_name,
      phone,
      email,
      id_card,
      line_id,
    });
    return res
      .status(201)
      .json({ message: "Customer created successfully", data: newCustomer });
  } catch (error) {
    return res.status(500).json({ message: "Error creating customer", error });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone, email, id_card, line_id } = req.body;

  // Logic to update a customer
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    await customer.update({
      first_name,
      last_name,
      phone,
      email,
      id_card,
      line_id,
    });
    return res
      .status(200)
      .json({ message: "Customer updated successfully", data: customer });
  } catch (error) {
    return res.status(500).json({ message: "Error updating customer", error });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    await customer.destroy();
    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting customer", error });
  }
};
