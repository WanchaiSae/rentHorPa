import express from "express";
import {
  getDormitories,
  getDormitoryById,
  createDormitory,
  updateDormitory,
  deleteDormitory,
} from "../controllers/dormitoryController.js";

const router = express.Router();

// For copy test endpoint
// http://localhost:5000/api/dormitories
router.get("/", getDormitories);
router.post("/", createDormitory);
// http://localhost:5000/api/dormitories/1
router.get("/:id", getDormitoryById);
router.put("/:id", updateDormitory);
router.delete("/:id", deleteDormitory);

export default router;
