import sequelize from "../db.js";
import { DataTypes} from 'sequelize';

//Deudas de los clientes
const Buy = sequelize.define('Buy', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
    },
    amount:{
        type: DataTypes.DECIMAL(10, 2), // Por ejemplo, un costo mensual como 50.00
        allowNull: false
    },
    buyDate: {   //Fecha de compra
        type: DataTypes.DATEONLY,
        allowNull: false
    },
});

export default Buy;