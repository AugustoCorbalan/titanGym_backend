import {Activity} from '../../../../database/models/index.js';
import {loadImage} from '../../functionsAux/cloudinaryFunctions.js';

const postActivity = async (req, res)=>{
    try {
        const data = JSON.parse(req.body.data);
        console.log(req.files);
        console.log(data);
        const images = await loadImage(req.files); //Cargo imagenes a Cloudinary
        console.log("images", images);
        const newData = {...data, icon: images[0]};
        const result = await Activity.create(newData);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default postActivity;