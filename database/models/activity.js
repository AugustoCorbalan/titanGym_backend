import sequelize from "../db.js";
import { DataTypes } from 'sequelize';

const Activity = sequelize.define('Activity', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegura que cada actividad tenga un nombre único
    primaryKey: true
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2), // Por ejemplo, un costo mensual como 50.00
    allowNull: false
  }
});

export default Activity;