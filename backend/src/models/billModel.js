import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Bill = sequelize.define(
  "bill",
  {
    bill_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rental_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // วันเรียกเก็บเงิน
    billing_period: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // หน่วยน้ำที่ใช้
    water_usage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // ราคาน้ำต่อหน่วย
    water_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // รวมค่าน้ำ
    water_charge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // เลขมิตีเตอร์ไฟฟ้าเริ่มต้น
    electricity_start: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // เขิมิตีเตอร์ไฟฟ้าปลาย
    electricity_end: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // ราคาไฟต่อหน่วย
    electricity_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // รวมค่าไฟ
    electricity_charge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // ค่าจิปาถะ
    other_charge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // รวมทั้งสิ้น
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // วันครบกำหนดชำระ
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // สถานะจ่ายหรือยังไม่จ่าย
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "bill",
  }
);

export default Bill;
