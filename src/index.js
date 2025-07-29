import app from './app.js';
import sequelize from '../database/db.js';
import dotenv from 'dotenv';
import { startBillingJobs, startNotificationsJobs } from './jobs/billingJobs.js';

dotenv.config();

async function main (){
    const {PORT} = process.env;
    try {
        await sequelize.sync({force: false});

        // Iniciar tareas cron:
        startBillingJobs(); //Tareas de actualización de facturas.
        startNotificationsJobs(); //Tareas de notificación a usuarios.
        
        // Levantar el servidor:
        app.listen(PORT);

        console.log(`Server is listening on PORT: ${PORT}`)
    } catch (error) {
        console.error('Ocurrió un error', error)
    }
}
main();