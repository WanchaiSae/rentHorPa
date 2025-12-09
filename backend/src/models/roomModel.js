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
    // ประเภทห้อง พัดลมหรือแอร์
    room_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // ราคาเช่าห้องต่อเดือน
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // สถานะห้อง ว่างหรือไม่ว่าง
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dorm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Room;
