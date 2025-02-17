import { Activity } from "../../../../database/models/index.js";
import { verifyUserIsAdmin } from "../../functionsAux/verifyUserIsAdmin.js";

const deleteActivity = async (req, res) => {
    const user = req.user;
    if(verifyUserIsAdmin(user)){
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ error: 'Se requiere un id de la actividad' });
            }
    
            const activity = await Activity.findByPk(id);
            if (!activity) {
                return res.status(404).json({ error: 'No se encuentra la actividad en la bd' });
            }
    
            await activity.destroy();
            return res.status(200).json({ message: 'Se elimino la actividad correctamente' });
        } catch (error) {
            return res.status(500).json({ error: 'Ocurrio un error al intentar eliminar la actividad' });
        }
    }else{
        return res.status(401).json({ error: 'No tienes permisos para realizar esta acción' });
    }
};

export default deleteActivity;