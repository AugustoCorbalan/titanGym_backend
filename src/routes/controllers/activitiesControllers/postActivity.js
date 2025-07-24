import {Activity} from '../../../../database/models/index.js';
import {loadImage} from '../../functionsAux/cloudinaryFunctions.js';
import { verifyUserIsAdmin } from '../../functionsAux/verifyUserIsAdmin.js';

const postActivity = async (req, res)=>{
    const user = req.user;
    if(verifyUserIsAdmin(user)){
        try {
            const data = JSON.parse(req.body.data);
            const images = await loadImage(req.files); //Cargo imagenes a Cloudinary
            const newData = {...data, icon: images[0]};
            const result = await Activity.create(newData);
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }else{
        console.log("No autorizado");
        return res.status(401).json({ error: 'No tienes permisos para realizar esta acción' });
    }
}

export default postActivity;