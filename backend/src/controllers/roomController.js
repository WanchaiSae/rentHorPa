export const getRooms = (req, res) => {
  // Logic to retrieve and send all rooms
  return res.status(200).send("Retrieve all rooms");
};

export const getRoomById = (req, res) => {
  const { id } = req.params;
  console.log(id);
  // Logic to retrieve and send a specific room by ID
  return res.status(200).send(`Retrieve room with ID: ${id}`);
};

export const createRoom = (req, res) => {
  const { room_number, price, status, dorm_id } = req.body;
  log("body:", req.body);
  // Logic to create a new room
  return res.status(201).send("Create a new room");
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
