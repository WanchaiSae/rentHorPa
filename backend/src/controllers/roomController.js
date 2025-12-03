// import Room from "../models/roomModel.js";
import { Room, Dormitory } from "../models/associations/associations.js";

export const getRooms = async (req, res) => {
  // Logic to retrieve and send all rooms
  try {
    const rooms = await Room.findAll();
    return res.status(200).json({
      data: rooms,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving rooms", error });
  }
};

export const getRoomByDormitoryId = async (req, res) => {
  const { dorm_id } = req.params;
  // Logic to retrieve and send rooms by dormitory ID
  try {
    const rooms = await Room.findAll({
      where: { dorm_id: dorm_id },
      include: [
        {
          model: Dormitory,
          as: "dormitory",
          required: true,
        },
      ],
    });
    console.log(rooms);
    return res.status(200).json({ data: rooms });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving rooms for dormitory", error });
  }
};

export const getRoomById = async (req, res) => {
  const { id } = req.params;

  // Logic to retrieve and send a specific room by ID
  try {
    const room = await Room.findByPk(id);
    if (room) {
      return res.status(200).json({ data: room });
    } else {
      return res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving room", error });
  }
};

export const createRoom = async (req, res) => {
  const { room_number, room_type, price, status, dorm_id } = req.body;
  // Logic to create a new room
  console.log("body:", req.body);
  try {
    const newRoom = await Room.create({
      room_number,
      room_type,
      price,
      status,
      dorm_id,
    });
    return res
      .status(201)
      .json({ message: "Room created successfully", data: newRoom });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating room", error: error });
  }
};

export const updateRoom = (req, res) => {
  const { id } = req.params;
  const { room_number, price, status, dorm_id } = req.body;
  console.log(id);
  console.log("body:", req.body);
  // Logic to update a room
  return res.status(200).send(`Update room with ID: ${id}`);
};

export const deleteRoom = (req, res) => {
  const { id } = req.params;
  console.log(id);
  // Logic to delete a room
  return res.status(200).send(`Delete room with ID: ${id}`);
};
