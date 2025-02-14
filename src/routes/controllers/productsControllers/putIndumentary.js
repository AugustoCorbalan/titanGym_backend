import { ProductIndumentary, IndumentaryType } from "../../../../database/models/index.js"; // Asegúrate de que la ruta al modelo es correcta
import { verifyUserIsAdmin } from "../../functionsAux/verifyUserIsAdmin.js";
import {sequelize} from "../../../../database/models/index.js";
import { loadImage, deleteImages } from "../../functionsAux/cloudinaryFunctions.js";

const putIndumentary = async (req, res)=>{
  const t = await sequelize.transaction(); // Iniciar una transacción
  try {
      const data = JSON.parse(req.body.data);
      const productId = JSON.parse(req.body.productId);
      let {images, ...newData} = data; //Separo las imagenes antiguas que se mantienen, del resto de datos.
      let notDeleteImages= images ? images : [];
      console.log("notDeleteIMages", notDeleteImages);
      let newImages = [] //Acá almacenamos las nuevas URLs de las nuevas imágenes.
      let type;

      const product = await ProductIndumentary.findByPk(productId);
        
      if(data.type){ //Si llega un valor de tipo de indumentaria lo gestiono, si no, NO.
        type = await IndumentaryType.findOne({
            where: { name : data.type},
            transaction: t
        })
        if(!type){ // Si no existe instancia con name = data.type en la tabla IndumentaryType, entonces la creo
          type = await IndumentaryType.create( { name: data.type }, {
                transaction: t
            })
        }

        await product.setProductType(type, {
          transaction: t
        });
      }
      //// Gestiono las imagenes ////////////////////////
      console.log("req.files", req)
      if(req.files){//Si existen imagenes nuevas las gestiono.
        newImages = await loadImage(req.files); //Cargo imagenes a Cloudinary
      }

      //Gestiono las modificaciones en las imagenes antiguas
      ///Primero elimino de la nube de Cloudinary las imagenes que hay que borrar/////////////////
      //Almaceno las URLs de las imagenes que hay que eliminar
      let urlsDeleteImages = [];
      console.log("product.images", product.images);
      console.log("notDeleteImages", notDeleteImages);
      urlsDeleteImages = product.images.filter((el)=> !notDeleteImages.includes(el)); //Me devuelve todas las imagenes a eliminar.
      console.log("urlsDeleteImages", urlsDeleteImages);
      const deletedImages = await deleteImages(urlsDeleteImages); //Elimino de la nube de Cloudinary las imagenes.
      if(!deletedImages){
        throw new Error("Error al eliminar imagenes de la nube de Cloudinary");
      }

      /////Agrego a newData todas las Urls de las imagenes (Las nuevas y las viejas que NO hay que eliminar);
      console.log("newImages", newImages)
      newData = {...newData, images: notDeleteImages.concat(newImages)};

      ///Actualizo la instancia en la base de datos.
      await product.update(newData, {
          transaction: t
      });
      
      await t.commit(); // Confirmar la transacción
      res.send("Producto de Indumentaria actualizado con éxito");
    } catch (error) {
      await t.rollback(); // Deshacer cambios si hubo un error
      res.status(400).send(error.message);
  }
}


export default putIndumentary;






