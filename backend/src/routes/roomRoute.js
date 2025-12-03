import express from "express";
import { getRoomById, getRooms } from "../controllers/roomController.js";

const router = express.Router();

// For copy test endpoint
// http://localhost:5000/api/rooms
router.get("/", getRooms);
router.post("/", createRoom);
router.put("/", updateRoom);
// http://localhost:5000/api/rooms/1
router.get("/:id", getRoomById);
router.delete("/:id", deleteRoom);
export default router;
