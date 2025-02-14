import fs from 'fs-extra';
import { uploadImage, deleteImage, getPublicId } from "../../utils/cloudinary.js";

export const loadImage = async (files)=>{
    let cont=0;
    const images = [];
    await Promise.all(files.map(async (file)=>{
        const result = await uploadImage(file.path); // Subo la imágen a cloudinary.
        await fs.unlink(file.path); //Elimino la imágen que guardo multer en "public".
        images.push(result.url);
        cont++
    }));
    return images;
}   

export const deleteImages = async (imagesUrls) => {
    try {
        await Promise.all(imagesUrls.map(async (url)=>{
            const publicId = await getPublicId(url); 
            await deleteImage(publicId);
        }))
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
    
}


