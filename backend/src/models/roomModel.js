import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Room = sequelize.define(
  "room",
  {
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    room_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    staus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dorm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
  },
  {
    timestamps: false,
    tableName: "rooms",
  }
);

export default Room;
