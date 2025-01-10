import {Activity} from '../../../../database/models/index.js';
import {User} from '../../../../database/models/index.js';

const getUser = async (req, res)=>{
    try {
        const googleId = req.user.id;
        const result = await User.findByPk(googleId,{   
            include: {
                model: Activity, // Incluye las actividades relacionadas
            }
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getUser;