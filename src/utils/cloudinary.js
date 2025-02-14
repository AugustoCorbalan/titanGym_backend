import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

//Configuracion de cloudinary:          
cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET
  });

//Función para la carga de imágenes:

export const uploadImage = async (filepath) => {
return await cloudinary.uploader.upload(
        filepath,
        { folder: "e-commerce"}, //Esto le indica a cloudinary que guarde las imagenes dentro de una carpeta llamada "e-commerce"
        function(error, result){ console.log(result) }
    );

}

//Función para eliminar imágenes en la nube:

export const deleteImage = async (public_id) => {
    return await cloudinary.uploader.destroy(public_id);
}

//Obtener publicID de una imagen a partir de su URL:

export const getPublicId = async (url) => {
    const partes = url.split("/");
    const id = `${partes[partes.length - 2]}/${partes[partes.length - 1].split(".")[0]}`;
    return id;
  }