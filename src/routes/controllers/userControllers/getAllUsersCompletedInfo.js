import {Activity, User, Membership, Debt} from '../../../../database/models/index.js';
import { verifyUserIsAdmin } from '../../functionsAux/verifyUserIsAdmin.js'

const getUser = async (req, res)=>{
    const userId = req.user;
    try {
        //Verifico si el usuario es administrador;
        const userIsAdmin = await verifyUserIsAdmin(userId);
        if(userIsAdmin){
            const result = await User.findAll({   
                include: [
                    {
                        model: Activity, // Incluye las actividades relacionadas
                    },
                    {
                        model: Membership, // Incluye las membresías relacionadas
                    },
                    {
                        model: Debt, // Incluye las deudas relacionadas
                    }
            ]
            })
            
            res.status(200).send(result);
        }else{
            throw new Error("El usario solicitante no tiene los permisos necesarios");
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getUser;