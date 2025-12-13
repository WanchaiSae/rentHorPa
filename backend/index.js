import express from "express";
import "dotenv/config";
import cors from "cors";
import sequelize from "./src/configs/database.js";

// Import routes
import dormitoryRoutes from "./src/routes/dormitoryRoute.js";
import roomRoutes from "./src/routes/roomRoute.js";
import customerRoutes from "./src/routes/customerRoute.js";
import paymentRoute from "./src/routes/paymentRoute.js";
import rentalRoutes from "./src/routes/rentalRoute.js"; // Changed from rentalRoute to rentalRoutes
import billRoutes from "./src/routes/billRoute.js"; // Changed from billRoute to billRoutes
import dashboardRoutes from "./src/routes/dashboardRoute.js"; // Added dashboardRoutes

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000; // Changed PORT from 3000 to 5000

// Use routes
app.use("/api/dormitories", dormitoryRoutes); // Original was /api/dormitories
app.use("/api/rooms", roomRoutes); // Original was /api/rooms
app.use("/api/customers", customerRoutes);
app.use("/api/payment", paymentRoute);
app.use("/api/rental", rentalRoutes); // Changed from rentalRoute to rentalRoutes
app.use("/api/bills", billRoutes); // Changed from billRoute to billRoutes
app.use("/api/dashboard", dashboardRoutes); // Added dashboardRoutes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
});
