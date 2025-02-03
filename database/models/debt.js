import sequelize from "../db.js";
import { DataTypes, INTEGER, STRING } from 'sequelize';
import Membership from "./membership.js";

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
            model: 'Users',
            key: 'googleId'
        }
    },
    amount:{
        type: DataTypes.DECIMAL(10, 2), // Por ejemplo, un costo mensual como 50.00
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('Pendiente', 'Pagada', 'Vencida'),
        allowNull: false,
        defaultValue: 'Pendiente'
    },
    dueDate: { //Fecha de vencimiento de la deuda
        type: DataTypes.DATE,
        allowNull: false
    },
    issueDate: {   //Fecha de emisión de la deuda
        type: DataTypes.DATE,
        allowNull: false
    },
    startDate: { //Fecha de inicio del periodo facturado
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: { //Fecha de fin del periodo facturado
        type: DataTypes.DATE,
        allowNull: false
    },
    products:{
        type: DataTypes.ARRAY(STRING),
        allowNull: false
    },
    description: { //Se utiliza para colocar comentarios, como por ejemplo: ("Se realizo un descuento del 50%")
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Debt;