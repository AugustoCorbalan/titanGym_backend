import {Notifications} from '../../../../database/models/index.js';
import {User} from '../../../../database/models/index.js';

const getLatestNotificationsForUser = async (req, res)=>{
    try {
        const googleId = req.user.id;
        const latestNotifications = await Notifications.findAll({
            include: [
                {
                model: User,
                where: { googleId }, // Filtramos por el usuario
                through: { attributes: [] } // Ocultamos columnas de la tabla intermedia
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