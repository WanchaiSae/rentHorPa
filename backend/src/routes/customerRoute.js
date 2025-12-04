import express from "express";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

// Example route for getting customer information
// http://localhost:5000/api/customers/
router.get("/", getCustomers);
router.post("/", createCustomer);
// http://localhost:5000/api/customers/1
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
export default router;
