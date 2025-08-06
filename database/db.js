import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // necesario para Render y algunas DB externas
        }
    }
});

export default sequelize;