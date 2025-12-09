import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Rental = sequelize.define(
  "rental",
  {
    rental_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // วันที่เช่า
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // วันที่ย้ายออก
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // มัดจำ
    deposit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "rental",
  }
);

export default Rental;
