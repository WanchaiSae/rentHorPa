import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

// http://localhost:5000/api/dashboard
router.get("/", getDashboardStats);

export default router;
