import app from './app.js';
import sequelize from '../database/db.js';
import { PORT } from "./config.js";

async function main (){
    try {
        await sequelize.sync({force: true});
        app.listen(PORT);
        console.log(`Server is listening on PORT: ${PORT}`)
    } catch (error) {
        console.error('Ocurrió un error', "error")
    }
}
main();