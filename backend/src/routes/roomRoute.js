import express from "express";
import {
  getRoomById,
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomByDormitoryId,
} from "../controllers/roomController.js";

const router = express.Router();

// For copy test endpoint
// http://localhost:5000/api/rooms
router.get("/", getRooms);
router.post("/", createRoom);
// http://localhost:5000/api/rooms/1
router.put("/:id", updateRoom);
router.get("/:id", getRoomById);
router.delete("/:id", deleteRoom);
// http://localhost:5000/api/rooms/dormitory/1
router.get("/dormitory/:dorm_id", getRoomByDormitoryId);

export default router;
