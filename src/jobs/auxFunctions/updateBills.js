import { Debt, PendingNotification, User, Membership } from '../../../database/models/index.js';
import { Op } from 'sequelize';
import { generateDebt } from '../../routes/functionsAux/facturacion/generateDebt.js';

//normalizeDate recibe una fecha con horario y devuelve la fecha de ese mismo día pero en la hora 00hs
const normalizeDate = (d) => {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

export const updateBills = async ()=>{
    //Actualiza el estado de todas las facturas y genera las notificaciones necesarias
    // const today = normalizeDate(new Date());
    const today = normalizeDate(new Date());
    try {
        const bills = await Debt.findAll({
            where: {
                status: {
                    [Op.in] : ['Pendiente', 'Vencida']
                }
            }
        });
        if(bills.length != 0){
            for (const bill of bills){
                const data = bill.dataValues;
                let vencimiento = new Date(data.dueDate);
                vencimiento.setHours(vencimiento.getHours() + 3); //Le sumo 3 para normalizar la zona horaria.
                const status = data.status;
                if( (vencimiento < today) && status == 'Pendiente' ){
                    //Seteo como "vencida".
                    await bill.update({status: 'Vencida'});
                    //Creo una notificación para avisar que se vencio.
                    await PendingNotification.create({
                        userId: data.userId,
                        typeNotification: 'Venc._factura',
                    })
                }else if(( vencimiento.getTime() === today.getTime())){
                    //Notificar que hoy se vence la factura.
                    PendingNotification.create({
                        userId: data.userId,
                        typeNotification: 'Ultimo_dia_venc._fact.',
                    })
                }
            }
            console.log("Facturas actualizadas");
        }else{
            console.log("No hay facturas para actualizar");
        }
    } catch (error) {
        console.log("Error al realizar tareas de mantenimiento de actualización de estado de facturas");
        console.log(error);
    }
}

//Emite todas las facturas necesarias
export const generateBills = async ()=>{
    try {
        const today = normalizeDate(new Date());
        //Recorrer todos los usuarios y verificar cuales tienen Membresías activas y la fecha de emisión es hoy.Emitir factura si es True.
        //Traigo todos los usuarios
        const users = await User.findAll();
        //Recorro todos los usuarios:
        for(const user of users){
            //Traigo todas las membresías de ese usuario.
            const memberships = await Membership.findAll({
                where:{
                    userId: user.googleId
                }
            });
            //Verifico si hay alguna membresía activa que su día de pago sea hoy:
            let generate = false;
            let count = 0;
            while(!generate && count < memberships.length){
                let payDay = memberships[0].payDay;
                if(payDay == today.getDate()){
                    generate = true;
                }
                count++;
            }
            //Si "generate" es true genero la factura.
            if(generate){
                generateDebt(user.googleId);
                console.log("Se genero la factura con éxito");
            }
        }
        console.log("Finalizó el trabajo de generación de nuevas facturas");
    } catch (error) {
        console.log("Ocurrió un error al generar las nuevas facturas!");
        console.log(error);
    }
}