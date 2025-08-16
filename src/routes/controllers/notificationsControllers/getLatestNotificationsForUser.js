import {Notification} from '../../../../database/models/index.js';
import {User} from '../../../../database/models/index.js';
import { col } from "sequelize";

const getLatestNotificationsForUser = async (req, res)=>{
    try {
        const googleId = req.user.id;
        const latestNotifications = await Notification.findAll({
            include: [
                {
                    model: User,
                    where: { googleId }, // Filtramos por el usuario
                    through: { attributes: ['viewed'] }
                }
            ],
            order: [['createdAt', 'DESC']], // Orden de más nuevas a más antiguas
            limit: 5 // Solo las últimas 5
        });
        res.status(200).send(latestNotifications);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getLatestNotificationsForUser;