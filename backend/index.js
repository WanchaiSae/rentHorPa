import express from "express";
import "dotenv/config";
import sequelize from "./src/configs/database.js";

// Import routes
import dormitoryRoutes from "./src/routes/dormitoryRoute.js";
import roomRoutes from "./src/routes/roomRoute.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Use routes
app.use("/api/dormitories", dormitoryRoutes);
app.use("/api/rooms", roomRoutes);

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
