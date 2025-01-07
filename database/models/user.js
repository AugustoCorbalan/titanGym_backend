import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define("user",{
    
    googleId:{
        type: DataTypes.STRING, 
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    picture:{
        type: DataTypes.STRING,
        allowNull: true
    },
    isAdmin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    typeUserAdmin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});

export default User;