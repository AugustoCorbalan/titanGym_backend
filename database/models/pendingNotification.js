import sequelize from "../db.js";
import { DataTypes } from 'sequelize';

// Diccionario:
// 'Venc._factura': Notificaciones de que la factura ya se vencio.
// 'Ultimo_dia_venc._fact.': Notificar que hoy es el último día para pagar la factura (Mañana se vence).

const TYPE_NOTIFICATION = ['Venc._factura', 'Ultimo_dia_venc._fact.', 'Nueva_factura'];
//Registro de notificaciones pendientes a realizar
const PendingNotification = sequelize.define('PendingNotification', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId:{
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'googleId'
        }
    },
    typeNotification:{
        type: DataTypes.ENUM(...TYPE_NOTIFICATION),
        allowNull: false
    }
});

export default PendingNotification;