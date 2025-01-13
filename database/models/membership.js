import sequelize from "../db.js";
import { DataTypes } from 'sequelize';

//Membresía contratada por cada usuario
const Membership = sequelize.define('Membership', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    activityId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'Activities',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('activa', 'inactiva'),
        allowNull: false,
        defaultValue: 'activa'
    },
    payDay:{
        type: DataTypes.INTEGER,
        validate:{
            min: 1,
            max: 30
        },
        allowNull: false,
    },
    startDate:{
        type: DataTypes.DATE,
        allowNull: true
    },
    endDate:{
        type: DataTypes.DATE,
        allowNull: true
    },
});

export default Membership;