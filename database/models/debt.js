import sequelize from "../db.js";
import { DataTypes } from 'sequelize';

//Deudas de los clientes
const Debt = sequelize.define('Debt', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
    },
    userId:{
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'User',
            key: 'googleId'
        }
    },
    activityId:{
        type: DataTypes.STRING,
        allowNull: true,
        references:{
            model: 'Activity',
            key: 'name'
        }
    },
    amount:{
        type: DataTypes.DECIMAL(10, 2), // Por ejemplo, un costo mensual como 50.00
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('Pendiente', 'Pagada'),
        allowNull: false,
        defaultValue: 'Pendiente'
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Debt;