import cron from 'node-cron';
import { updateBills, generateBills } from './auxFunctions/updateBills.js';

export const startBillingJobs = () => {
  generateBills();
  cron.schedule('26 12 * * *', async () => {
    console.log('Ejecutando tarea diaria de actualización de facturas...');
    await updateBills();
    await generateBills();
  },{
    timezone: 'America/Argentina/Buenos_Aires'
  });
}
export const startNotificationsJobs = () => {
  cron.schedule('26 12 * * *', async () => {
    console.log('Ejecutando tarea diaria de notificación a usuarios...');
    
  },{
    timezone: 'America/Argentina/Buenos_Aires'
  });
}