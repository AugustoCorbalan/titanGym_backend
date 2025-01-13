import sequelize from "../db.js";
import { DataTypes } from 'sequelize';

const Activity = sequelize.define('Activity', {
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
  hour: {
    type: DataTypes.TIME,
    allowNull: false
  }
});

export default Activity;