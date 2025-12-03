import Dormitory from "../dormitoryModel.js";
import Room from "../roomModel.js";

Dormitory.hasMany(Room, { foreignKey: "dorm_id", as: "rooms" });
Room.belongsTo(Dormitory, { foreignKey: "dorm_id", as: "dormitory" });

export { Dormitory, Room };
