import jwt from 'jsonwebtoken';
import {Debt} from '../../../../database/models/index.js';

const getDebtsOfUser = async (req, res)=>{
    const {userId} = req.params;
    const tokenUserId = req.user;
    try {
        //Verifico que el userId que viene por el token sea el mismo que el que viene por params (Medida de seguridad)
        if(userId != tokenUserId){
            return res.status(403).json({ error: 'No tienes permisos para acceder a estos datos' });
        }
        const result = await Debt.findAll({
            where: {userId}
        });
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getDebtsOfUser;