import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Room = sequelize.define(
  "rooms",
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
    room_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dorm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Room;
