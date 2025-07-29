import sequelize from "../db.js";
import { DataTypes } from 'sequelize';

const TYPE_NOTIFICATION = ['Venc._factura', 'Ultimo_dia_venc._fact.', 'Nueva_factura', 'Cumpleaños'];

//Notificaciones a usuarios
const Notifications = sequelize.define('Notifications', {
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
    textNotification: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

export default Notifications;