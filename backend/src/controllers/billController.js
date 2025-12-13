import { Bill, Rental, Room, Customer, Payment } from "../models/associations/associations.js";

export const getBills = async (req, res) => {
    try {
        const bills = await Bill.findAll({
            include: [
                {
                    model: Rental,
                    as: "rental",
                    include: [
                        { model: Room, as: "room" },
                        { model: Customer, as: "customer" }
                    ]
                },
                { model: Payment, as: "payments" }
            ]
        });
        return res.status(200).json({ data: bills });
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving bills", error });
    }
};

export const getBillById = async (req, res) => {
    const { id } = req.params;
    try {
        const bill = await Bill.findByPk(id, {
            include: [
                {
                    model: Rental,
                    as: "rental",
                    include: [
                        { model: Room, as: "room" },
                        { model: Customer, as: "customer" }
                    ]
                },
                { model: Payment, as: "payments" }
            ]
        });
        if (!bill) return res.status(404).json({ message: "Bill not found" });
        return res.status(200).json({ data: bill });
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving bill", error });
    }
};

export const createBill = async (req, res) => {
    const {
        rental_id,
        billing_period,
        water_usage,
        water_rate,
        electricity_start,
        electricity_end,
        electricity_rate,
        other_charge,
        due_date
    } = req.body;

    try {
        // Calculate charges
        const water_charge = water_usage * water_rate;
        const electricity_charge = (electricity_end - electricity_start) * electricity_rate;

        // Fetch rental to get room price
        const rental = await Rental.findByPk(rental_id, {
            include: [{ model: Room, as: 'room' }]
        });
        if (!rental) return res.status(404).json({ message: "Rental not found" });

        const room_price = rental.room.price; // Base rent
        const total_amount = room_price + water_charge + electricity_charge + (Number(other_charge) || 0);

        const newBill = await Bill.create({
            rental_id,
            billing_period,
            water_usage,
            water_rate,
            water_charge,
            electricity_start,
            electricity_end,
            electricity_rate,
            electricity_charge,
            other_charge: other_charge || 0,
            total_amount,
            due_date,
            status: 0 // Unpaid
        });

        return res.status(201).json({ message: "Bill created successfully", data: newBill });
    } catch (error) {
        return res.status(500).json({ message: "Error creating bill", error });
    }
};

export const updateBill = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Mainly for updating status to 'Paid' (1)

    try {
        const bill = await Bill.findByPk(id);
        if (!bill) return res.status(404).json({ message: "Bill not found" });

        // Assuming we only update status or re-calculate via create logic (omitted for brevity, allowing simple status update)
        if (status !== undefined) bill.status = status;

        await bill.save();
        return res.status(200).json({ message: "Bill updated successfully", data: bill });
    } catch (error) {
        return res.status(500).json({ message: "Error updating bill", error });
    }
};

export const deleteBill = async (req, res) => {
    const { id } = req.params;
    try {
        const bill = await Bill.findByPk(id);
        if (!bill) return res.status(404).json({ message: "Bill not found" });
        await bill.destroy();
        return res.status(200).json({ message: "Bill deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting bill", error });
    }
};
