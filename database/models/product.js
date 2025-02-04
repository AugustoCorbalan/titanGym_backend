import sequelize from "../db.js";
import { DataTypes } from 'sequelize';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM('Remera'),
    allowNull: false,
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
    type: DataTypes.ARRAY(ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL', 'Unico')),
    allowNull: false
  }
   
});

export default Product;