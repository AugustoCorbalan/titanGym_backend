import fs from 'fs-extra';
import { uploadImage } from "../../utils/cloudinary";

export const loadImage = async (files, data)=>{
    let cont=0;
    await Promise.all(files.map(async (file)=>{
        const result = await uploadImage(file.path); // Subo la imágen a cloudinary.
        await fs.unlink(file.path); //Elimino la imágen que guardo multer en "public".
        data.image ?
            data.image = {
                ...data.image,
                [cont] : {url: result.url, public_id: result.public_id}
            } :
            data.image = {
                0 : {url: result.url, public_id: result.public_id}
            }
        cont++
    }));
    return data;
}   