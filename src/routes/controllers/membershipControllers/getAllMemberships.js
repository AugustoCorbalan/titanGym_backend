import {Membership} from '../../../../database/models/index.js';
import { verifyUserIsAdmin } from '../../functionsAux/verifyUserIsAdmin.js';

const getAllMemberships = async (req, res)=>{
    const userId = req.user;
    try {
        //Verifico si el usuario es administrador;
        const userIsAdmin = await verifyUserIsAdmin(userId);
        if(userIsAdmin){
            const result = await Membership.findAll();
            res.status(200).send(result);
        }else{
            throw new Error("El usario solicitante no tiene los permisos necesarios");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getAllMemberships;