import express from "express";
import {
  getRentalByid,
  getRentals,
  updateRental,
  createRental,
  deleteRental,
} from "../controllers/rentalController.js";

const router = express.Router();

// http://localhost:5000/api/rental
router.get("/", getRentals);
// http://localhost:5000/api/rental/1
router.post("/", createRental);
router.get("/:id", getRentalByid);
router.put("/:id", updateRental);
router.delete("/:id", deleteRental);

export default router;
