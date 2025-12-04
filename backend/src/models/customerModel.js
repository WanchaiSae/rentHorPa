import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Customer = sequelize.define(
  "customer",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_card: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    line_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "customers",
  }
);

export default Customer;
