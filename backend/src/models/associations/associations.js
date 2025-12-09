import Customer from "../customerModel.js";
import Dormitory from "../dormitoryModel.js";
import Rental from "../rentalModel.js";
import Room from "../roomModel.js";
import Bill from "../billModel.js";
import Payment from "../paymentModel.js";

// Define associations between models
// Dormitory 1--* Room

Dormitory.hasMany(Room, { foreignKey: "dorm_id", as: "rooms" });
Room.belongsTo(Dormitory, { foreignKey: "dorm_id", as: "dormitory" });

// Customer 1--* Rental
Customer.hasMany(Rental, { foreignKey: "customer_id", as: "rentals" });
Rental.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });

// Room 1--* Rental
Room.hasMany(Rental, { foreignKey: "room_id", as: "rentals" });
Rental.belongsTo(Room, { foreignKey: "room_id", as: "room" });

// Rental 1--* Bill
Rental.hasMany(Bill, { foreignKey: "rental_id", as: "bills" });
Bill.belongsTo(Rental, { foreignKey: "rental_id", as: "rental" });

// Bill 1--* Payment
Bill.hasMany(Payment, { foreignKey: "bill_id", as: "payments" });
Payment.belongsTo(Bill, { foreignKey: "bill_id", as: "bill" });

export { Dormitory, Room, Customer, Rental, Payment, Bill };
