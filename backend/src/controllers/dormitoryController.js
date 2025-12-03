import Dormitory from "../models/dormitoryModel.js";

export const getDormitories = async (req, res) => {
  // Logic to retrieve and send a list of dormitories
  try {
    const dormitories = await Dormitory.findAll();
    return res.status(200).json({
      data: dormitories,
    });
  } catch (error) {
    return res.status(500).send("Error retrieving dormitories");
  }
};

export const getDormitoryById = async (req, res) => {
  const { id } = req.params;
  // Logic to retrieve and send a specific dormitory by ID
  try {
    const dormitory = await Dormitory.findByPk(id);
    if (!dormitory) {
      return res.status(404).send("Dormitory not found");
    }
    return res.status(200).json({
      data: dormitory,
    });
  } catch (error) {
    return res.status(500).send("Error retrieving dormitory");
  }
};

export const createDormitory = async (req, res) => {
  const { dorm_name, address, map } = req.body;
  // Logic to create a new dormitory
  // console.log(dorm_name, address, map);
  try {
    const newDormitory = await Dormitory.create({ dorm_name, address, map });
    return res.status(201).json({
      message: "Dormitory created successfully",
      data: newDormitory,
    });
  } catch (error) {
    return res.status(500).send("Error creating dormitory");
  }
};

export const updateDormitory = async (req, res) => {
  const { id } = req.params;
  const { dorm_name, address, map } = req.body;
  // Logic to update a specific dormitory by ID
  try {
    const dormitory = await Dormitory.findByPk(id);
    if (!dormitory) {
      return res.status(404).send("Dormitory not found");
    }
    dormitory.dorm_name = dorm_name;
    dormitory.address = address;
    dormitory.map = map;
    await dormitory.save();
    return res.status(200).json({
      message: "Dormitory updated successfully",
      data: dormitory,
    });
  } catch (error) {
    return res.status(500).send("Error updating dormitory");
  }
};

export const deleteDormitory = async (req, res) => {
  const { id } = req.params;
  // Logic to delete a specific dormitory by ID
  try {
    const dormitory = await Dormitory.findByPk(id);
    if (!dormitory) {
      return res.status(404).send("Dormitory not found");
    }
    await dormitory.destroy();
    return res.status(200).json({
      message: "Dormitory deleted successfully",
    });
  } catch (error) {
    return res.status(500).send("Error deleting dormitory");
  }
};
