import { Customer, Room, Rental, Bill } from "../models/associations/associations.js";
import { Op } from "sequelize";
import sequelize from "../configs/database.js";

export const getDashboardStats = async (req, res) => {
    try {
        // 1. Total Customers ever
        const totalCustomers = await Customer.count();

        // 2. Active Tenants (Occupied Rooms)
        // Adjust logic if you strictly want active rentals, but room status=0 is a good proxy
        const activeTenants = await Room.count({
            where: { status: 0 }
        });

        // 3. Vacant Rooms
        const vacantRooms = await Room.count({
            where: { status: 1 }
        });

        // 4. Yearly Financial Stats
        const selectedYear = req.query.year || new Date().getFullYear();

        // Get available years for dropdown
        const availableYearsData = await Bill.findAll({
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.fn('YEAR', sequelize.col('billing_period'))), 'year']
            ],
            order: [[sequelize.col('year'), 'DESC']]
        });
        const availableYears = availableYearsData.map(y => y.get('year'));

        const yearlyRevenue = await Bill.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('billing_period')), 'month'],
                [sequelize.fn('SUM', sequelize.col('total_amount')), 'total']
            ],
            where: sequelize.where(sequelize.fn('YEAR', sequelize.col('billing_period')), selectedYear),
            group: [sequelize.fn('MONTH', sequelize.col('billing_period'))],
            order: [[sequelize.fn('MONTH', sequelize.col('billing_period')), 'ASC']]
        });

        // 5. Recent/Upcoming Movements
        // Fetch recent rentals (Check-ins)
        const recentRentals = await Rental.findAll({
            limit: 10,
            order: [['start_date', 'DESC']],
            include: [
                { model: Customer, as: 'customer', attributes: ['first_name', 'last_name'] },
                { model: Room, as: 'room', attributes: ['room_number'] }
            ]
        });

        return res.status(200).json({
            data: {
                totalCustomers,
                activeTenants,
                vacantRooms,
                yearlyRevenue,
                availableYears,
                selectedYear: Number(selectedYear),
                recentRentals
            }
        });

    } catch (error) {
        console.error("Dashboard error:", error);
        return res.status(500).json({ message: "Error fetching dashboard stats", error });
    }
};
