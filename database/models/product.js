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
  articleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Debts',
        key: 'id'
    },
  }
   
});

export default Product;