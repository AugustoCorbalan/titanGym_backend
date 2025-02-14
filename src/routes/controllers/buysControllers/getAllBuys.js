import {Buy, ProductIndumentary, ProductNutrifit, User} from '../../../../database/models/index.js';
import { verifyUserIsAdmin } from '../../functionsAux/verifyUserIsAdmin.js';

const getAllBuys = async (req, res)=>{
    try {
        if(await verifyUserIsAdmin(req.user)){
            const result = await Buy.findAll({
                include: [
                    {
                        model: User,
                        attributes: ["name"]
                    },{
                        model: ProductIndumentary,
                        attributes: ["name"]
                    },{
                        model: ProductNutrifit,
                        attributes: ["name"]
                    }
                ]
            });
            res.status(200).json(result);
        }else{
            throw new error("El usuario solicitante no tiene los permisos necesarios");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getAllBuys;