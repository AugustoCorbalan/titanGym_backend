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
                        model: Debt,
                        separate: true, // Permite ordenar y limitar por usuario
                        order: [['issueDate', 'DESC']], // Ordena deudas por fecha descendente
                        limit: 2 // Solo trae las últimas 2 deudas de cada usuario.
                    }
                ]
            })
            res.status(200).send(result);
        }else{
            throw new Error("El usario solicitante no tiene los permisos necesarios");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getUser;