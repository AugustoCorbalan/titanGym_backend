import {Activity, Notifications} from '../../../../database/models/index.js';
import {User} from '../../../../database/models/index.js';

const getUser = async (req, res)=>{
    try {
        const googleId = req.user.id;
        const result = await User.findByPk(googleId,{   
            include: [
            {
                model: Activity // Incluye las actividades relacionadas
            },
            {
                model: Notifications,
                separate: true, // Hace una consulta aparte para Notifications
                limit: 5,       // Trae solo las últimas 5
                order: [['createdAt', 'DESC']] // Ordena de más nuevas a más antiguas
            }
        ]
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getUser;