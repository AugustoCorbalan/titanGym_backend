import fs from 'fs-extra';
import { uploadImage } from "../../utils/cloudinary.js";

export const loadImage = async (files, data)=>{
    let cont=0;
    const images = [];
    await Promise.all(files.map(async (file)=>{
        const result = await uploadImage(file.path); // Subo la imágen a cloudinary.
        await fs.unlink(file.path); //Elimino la imágen que guardo multer en "public".
        images.push(result.url);
        cont++
    }));
    return {...data, images};
}   