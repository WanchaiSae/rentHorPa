import { Payment } from "../models/associations/associations.js";

export const getPayments = async (req, res) => {
  try {
    const response = await Payment.findAll();
    return res.status(200).json({
      data: response,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching payments", error });
  }
};

export const getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment ID Not found." });
    }
    return res.status(200).json({ data: payment });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching payments ID", error });
  }
};

export const createPayment = async (req, res) => {
  const { amount, payment_type, bill_id } = req.body;

  try {
    const newPayment = await Payment.create({
      amount,
      payment_type,
      bill_id, // Ensure bill_id is passed and valid
    });

    // Optional: Update bill status to 'Paid' (1) if needed, but keeping it simple for now or separate logic

    return res.status(201).json({
      data: newPayment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating payment method", error });
  }
};

export const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const paymentIdCheck = await Payment.findByPk(id);
    if (!paymentIdCheck) {
      return res.status(404).json({ message: "Payment ID Not found." });
    }
    await paymentIdCheck.destroy();
    return res.status(200).json({
      message: "Payment Deleted Successfully.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting payment", error });
  }
};
