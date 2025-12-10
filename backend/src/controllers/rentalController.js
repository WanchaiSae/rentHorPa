import { Customer, Rental, Room } from "../models/associations/associations.js";

export const getRentals = async (req, res) => {
  try {
    const fetchRentals = await Rental.findAll();
    return res.status(200).json({
      data: fetchRentals,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching Rentals", error });
  }
};

export const getRentalByid = async (req, res) => {
  const rental_id = req.params.id;
  try {
    const fetchRental = await Rental.findByPk(rental_id, {
      include: [
        {
          model: Room,
          as: "room",
        },
        {
          model: Customer,
          as: "customer",
        },
      ],
    });
    if (!fetchRental) {
      return res.status(404).json({ message: "Rental ID Not Found." });
    }
    return res.status(200).json({
      data: fetchRental,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching Rentals", error });
  }
};

export const updateRental = async (req, res) => {
  const rental_id = req.params.id;

  const updateData = req.body;

  try {
    const rentalUpdateById = await Rental.findByPk(rental_id);

    if (!rentalUpdateById) {
      return res.status(404).json({ message: "Rental ID Not Found." });
    }

    const updateRental = await rentalUpdateById.update(updateData);

    return res.status(200).json({
      message: "Rental updated successfully",
      data: updateRental,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating Rentals", error });
  }
};

export const deleteRental = async (req, res) => {
  const rental_id = req.params.id;
  try {
    const checkRentalById = await Rental.findByPk(rental_id);
    if (!checkRentalById) {
      return res.status(404).json({ message: "Rental ID Not Found." });
    }
    await checkRentalById.destroy();
    return res.status(200).json({
      message: "Rental deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting Rentals", error });
  }
};
