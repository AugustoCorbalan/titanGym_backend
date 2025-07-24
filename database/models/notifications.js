import sequelize from "../db.js";
import { DataTypes } from 'sequelize';

//Notificaciones a usuarios
const Notifications = sequelize.define('Notifications', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    typeNotification:{
        type: DataTypes.STRING,
        allowNull: false
    },
    textNotification: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

export default Notifications;