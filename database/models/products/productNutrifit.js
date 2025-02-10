import sequelize from "../../db.js";
import { DataTypes } from 'sequelize';

const ProductNutrifit = sequelize.define('ProductNutrifit', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cost: {
        type: DataTypes.DECIMAL(10, 2), // Por ejemplo, un costo mensual como 50.00
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    caracteristic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    }  
}, {
    tableName: 'ProductsNutrifits',
    timestamps: false  //Evita que cree automaticamente las propiedas de fecha de creación de la tabla
});

export default ProductNutrifit;