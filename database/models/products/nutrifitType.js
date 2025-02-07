import sequelize from "../../db.js";
import { DataTypes } from 'sequelize';

const NutrifitType = sequelize.define('NutrifitType', {
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
}, {
    tableName: 'NutrifitTypes',
    timestamps: false  //Evita que cree automaticamente las propiedas de fecha de creación de la tabla
});

export default NutrifitType;