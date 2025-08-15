import {Notification, User, Activity, sequelize} from '../../../../database/models/index.js';
import { verifyUserIsAdmin } from '../../functionsAux/verifyUserIsAdmin.js';
import { Op } from 'sequelize';
import { sendNotifications_push } from '../../../jobs/auxFunctions/sendNotifications.js';

const postNotification = async (req, res)=>{
    const user = req.user;
    const data = JSON.parse(req.body.data);
    if(verifyUserIsAdmin(user)){
        const t = await sequelize.transaction();
        try {
            const newNotification = await Notification.create({
                typeNotification: "push_gral",
                titleNotification: data.title,
                textNotification: data.text,
            }, { transaction: t });
            //Traigo todos los usuarios a notificar:         
            const list_users = await User.findAll({
                include: [{
                    model: Activity,
                    where: { id: {[Op.in]: data.groups}},
                    through: { attributes: []},
                    required: true
                }],
                distinct: true
            })
            await newNotification.addUsers(list_users, { transaction: t });
            console.log("Notificaciones guardadas con éxito");
            //Envío las notificaciones a los usuarios:
            try {
                await sendNotifications_push(newNotification, list_users);
            } catch (error) {
                throw new Error("Error al enviar las notificaciones al usuario");
            }
            await t.commit();
            res.status(200).send("Notificaciones cargadas y enviadas con éxito");
        } catch (error) {
            t.rollback();
            console.log(error);
            res.status(400).send(error.message);
        }
    }
}

export default postNotification;