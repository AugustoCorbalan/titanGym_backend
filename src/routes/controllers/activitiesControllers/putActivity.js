import {Activity} from '../../../../database/models/index.js';
import {loadImage} from '../../functionsAux/cloudinaryFunctions.js';
import { verifyUserIsAdmin } from '../../functionsAux/verifyUserIsAdmin.js';

const putActivity = async (req, res)=>{
    const user = req.user;
    if(verifyUserIsAdmin(user)){
        try {
            const data = JSON.parse(req.body.data);
            let newData = data;
            if(req.files){
                const images = await loadImage(req.files); //Cargo imagenes a Cloudinary
                newData = {...data, icon: images[0]};
            }
            console.log(data)
            const activity = await Activity.findByPk(data.id);
            await activity.update(newData);
            res.status(200).send("Actividad actualizada correctamente");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }else{
        return res.status(401).json({ error: 'No tienes permisos para realizar esta acción' });
    }
}

export default putActivity;