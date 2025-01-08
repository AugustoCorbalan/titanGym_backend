import app from './app.js';
import sequelize from '../database/db.js';
import dotenv from 'dotenv';

dotenv.config();

async function main (){
    const {PORT} = process.env;
    try {
        await sequelize.sync({force: true});
        app.listen(PORT);
        console.log(`Server is listening on PORT: ${PORT}`)
    } catch (error) {
        console.error('Ocurrió un error', "error")
    }
}
main();