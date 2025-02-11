import {Buy} from '../../../../database/models/index.js';
import { verifyUserIsAdmin } from '../../functionsAux/verifyUserIsAdmin.js';

const getAllBuys = async (req, res)=>{
    try {
        if(verifyUserIsAdmin(req.user)){
            const result = await Buy.findAll();
            res.status(200).send(result);
        }else{
            throw error("El usuario solicitante no tiene los permisos necesarios");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getAllBuys;