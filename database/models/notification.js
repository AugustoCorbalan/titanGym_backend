import sequelize from "../db.js";
import { DataTypes } from 'sequelize';

const TYPE_NOTIFICATION = ['Venc._factura', 'Ultimo_dia_venc._fact.', 'Nueva_factura', 'Cumpleaños', 'push_gral'];

//Notificaciones a usuarios
const Notification = sequelize.define('Notifications', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    typeNotification:{
        type: DataTypes.ENUM(TYPE_NOTIFICATION),
        allowNull: false
    },
    titleNotification: {
        type: DataTypes.STRING,
        allowNull: true
    },
    textNotification: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

export default Notification;