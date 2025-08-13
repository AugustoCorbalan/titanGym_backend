import { updateBills, generateBills } from '../../../jobs/auxFunctions/updateBills.js';
import { checkBirthday } from '../../../jobs/auxFunctions/checkBirthday.js';

export const dailyUpdater = async (req, res)=>{
    try {
        console.log('Ejecutando tarea diaria de actualización de facturas...');
        await checkBirthday();
        await updateBills();
        await generateBills();
        console.log("Tareas de actualización diaria realizada con éxito");
        res.status(200).send("Tarea de actualización terminada con éxito");
    } catch (error) {
        console.log("Error en trabajos de actualización diaria");
        console.error(error);
        res.status(400).send(error);
    }
}