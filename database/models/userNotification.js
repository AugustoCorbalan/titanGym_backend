import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const UserNotification = sequelize.define('UserNotification', {
    viewed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { timetamps: true });

export default UserNotification;