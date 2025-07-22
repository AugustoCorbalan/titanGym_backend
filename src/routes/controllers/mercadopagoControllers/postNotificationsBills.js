import { Payment } from "mercadopago";
import mercadopago from "../../../utils/mercadopagoConfig.js";
import { verifyNotification } from "./functions/verifyNotification.js";
import { handlerDbPayDebt } from "./functions/handlersDb.js";

export const postNotificationsBills = async (req, res) => {
    console.log("LLEGO LA NOTIFICACION POST!!!")
    if(req.query.type && req.query.type == 'payment'){
        try {
           if(verifyNotification(req)){ // Verifico que la notificación sea autentica.
                // Obtenemos el pago
                const payment = await new Payment(mercadopago).get({id: req.body.data.id});
                const { bill_id }= payment.metadata;
                const amount = payment.transaction_details.total_paid_amount;
                if(payment.status === "approved"){ // Si se aprueba, modificamos la bd
                    handlerDbPayDebt(bill_id, amount);
                }
                res.status(200).send("Exito");
            }else{
                throw new Error("No se pudo validar el origen de la notificación");
            }
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    res.status(200);
}