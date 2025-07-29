import cron from 'node-cron';
import { updateBills, generateBills } from './auxFunctions/updateBills.js';
import { checkBirthday } from './auxFunctions/checkBirthday.js';

import { sendPendingNotifications } from './auxFunctions/sendNotifications.js';

export const startBillingJobs = () => {
  cron.schedule('48 17 * * *', async () => {
    console.log('Ejecutando tarea diaria de actualización de facturas...');
    await checkBirthday();
    await updateBills();
    await generateBills();
  },{
    timezone: 'America/Argentina/Buenos_Aires'
  });
}
export const startNotificationsJobs = () => {
  cron.schedule('55 17 * * *', async () => {
    console.log('Ejecutando tarea diaria de notificación a usuarios...');
    sendPendingNotifications();
  },{
    timezone: 'America/Argentina/Buenos_Aires'
  });
}
