import sequelize from "../db.js";
import { DataTypes } from 'sequelize';

//Registro de los pagos realizados
const Payment = sequelize.define('Payment', {
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
    debtId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Debts',
            key: 'id'
        },
        onDelete: 'SET NULL'
    },
    amount:{
        type: DataTypes.DECIMAL(10, 2), // Por ejemplo, un costo mensual como 50.00
        allowNull: false
    },
    paymentDate:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    method: {
        type: DataTypes.ENUM('efectivo', 'transferencia', 'tarjeta'),
        allowNull: false
    }
});

export default Payment;