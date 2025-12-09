import express from "express";
import {
  createPayment,
  deletePayment,
  getPaymentById,
  getPayments,
} from "../controllers/paymentController.js";

const router = express.Router();

// http://localhost:5000/api/payment
router.get("/", getPayments);
router.post("/", createPayment);
// http://localhost:5000/api/payment/1
router.get("/:id", getPaymentById);
router.delete("/:id", deletePayment);

export default router;
