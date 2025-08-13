import { sendPendingNotifications } from "../../../jobs/auxFunctions/sendNotifications.js";

export const sendNotifications = async (req, res)=>{
    try {
        console.log('Ejecutando tarea de notificación a usuarios');
        await sendPendingNotifications();
        console.log("Tareas de notificación realizada con éxito");
        res.status(200).send("Notificaciones enviadas con éxito");
    } catch (error) {
        console.log("Error en trabajos de notificaión");
        console.error(error);
        res.status(400).send(error);
    }
}