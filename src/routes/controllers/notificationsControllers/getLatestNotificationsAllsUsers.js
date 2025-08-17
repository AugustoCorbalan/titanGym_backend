import {Notification} from '../../../../database/models/index.js';
import {User, Activity} from '../../../../database/models/index.js';
import {verifyUserIsAdmin} from '../../functionsAux/verifyUserIsAdmin.js';

const getLatestNotificationsAllsUser = async (req, res)=>{
    try {
        const googleId = req.user.id;
        const isAdmin = verifyUserIsAdmin({id: googleId});

        if(isAdmin){
            const latestNotifications = await Notification.findAll({
                include: [
                    {
                        model: User,
                        through: { attributes: ['viewed'] }
                    },
                    {
                        model: Activity,
                        through: { attributes: []}
                    }
                ],
                order: [['createdAt', 'DESC']], // Orden de más nuevas a más antiguas
                limit: 5 // Solo las últimas 5
            });
            res.status(200).send(latestNotifications);
        }else{
            throw new Error("El usuario no es administrador");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
};

export default getLatestNotificationsAllsUser;