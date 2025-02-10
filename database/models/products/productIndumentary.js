import sequelize from "../../db.js";
import { DataTypes } from 'sequelize';

const ProductIndumentary = sequelize.define('ProductIndumentary', {
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
  fabric: {
    type: DataTypes.STRING,
    allowNull: true
  },
  age: {
    type: DataTypes.ENUM('Niño', 'Adulto', 'Todas'),
    allowNull: false,
    defaultValue: 'Todas'
  },
  gender: {
    type: DataTypes.ENUM('Hombre', 'Mujer', 'Unisex'),
    allowNull: false,
    defaultValue: 'Unisex'
  },
  sizes: {
    type: DataTypes.ARRAY(DataTypes.ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL', 'Unico')),
    allowNull: false
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  }
}, {
    tableName: 'productsIndumentaries',
    timestamps: false  //Evita que cree automaticamente las propiedas de fecha de creación de la tabla
});

export default ProductIndumentary;