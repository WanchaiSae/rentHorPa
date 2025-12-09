import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Payment = sequelize.define(
  "payment",
  {
    payment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // จำนวนเงิน (สำหรับ Generate QRCODE)
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "payment",
    timestamps: false,
  }
);

export default Payment;
