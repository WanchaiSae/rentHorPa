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
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deposit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
  },
  {
    timestamps: false,
    tableName: "rental",
  }
);

export default Rental;
