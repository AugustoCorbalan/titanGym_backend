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
  maximumRegistered: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 12
  },
  numberRegistered: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  startHour: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endHour: {
    type: DataTypes.TIME,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'https://cdn-icons-png.flaticon.com/512/1828/1828665.png'
  },
});

export default Activity;