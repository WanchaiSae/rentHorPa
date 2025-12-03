export const getDormitories = (req, res) => {
  // Logic to retrieve and send a list of dormitories
  res.send("List of dormitories");
};

export const getDormitoryById = (req, res) => {
  const { id } = req.params;
  // Logic to retrieve and send a specific dormitory by ID
  res.send(`Details of dormitory with ID: ${id}`);
};

export const createDormitory = (req, res) => {
  const dormitoryData = req.body;
  // Logic to create a new dormitory
  res.status(201).send("Dormitory created");
};

export const updateDormitory = (req, res) => {
  const { id } = req.params;
  const dormitoryData = req.body;
  // Logic to update a specific dormitory by ID
  res.send(`Dormitory with ID: ${id} updated`);
};

export const deleteDormitory = (req, res) => {
  const { id } = req.params;
  // Logic to delete a specific dormitory by ID
  res.send(`Dormitory with ID: ${id} deleted`);
};
