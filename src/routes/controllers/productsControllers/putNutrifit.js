import { ProductNutrifit, NutrifitType } from "../../../../database/models/index.js"; // Asegúrate de que la ruta al modelo es correcta
import {sequelize} from "../../../../database/models/index.js";
import { loadImage, deleteImages } from "../../functionsAux/cloudinaryFunctions.js";

const putNutrifit = async (req, res)=>{
  const t = await sequelize.transaction(); // Iniciar una transacción
  try {
      const data = JSON.parse(req.body.data);
      const productId = JSON.parse(req.body.productId);
      let {image, ...newData} = data; //Separo las imagenes antiguas que se mantienen, del resto de datos.
      let notDeleteImages= image ? image : [];
      let newImages = [] //Acá almacenamos las nuevas URLs de las nuevas imágenes.
      let type;

      const product = await ProductNutrifit.findByPk(productId);
        
      if(data.type){ //Si llega un valor de tipo de indumentaria lo gestiono, si no, NO.
        type = await NutrifitType.findOne({
            where: { name : data.type},
            transaction: t
        })
        if(!type){ // Si no existe instancia con name = data.type en la tabla IndumentaryType, entonces la creo
          type = await NutrifitType.create( { name: data.type }, {
                transaction: t
            })
        }

        await product.setProductType(type, {
          transaction: t
        });
      }
      //// Gestiono las imagenes ////////////////////////
      if(req.files){//Si existen imagenes nuevas las gestiono.
        newImages = await loadImage(req.files); //Cargo imagenes a Cloudinary
      }

      //Gestiono las modificaciones en las imagenes antiguas
      ///Primero elimino de la nube de Cloudinary las imagenes que hay que borrar/////////////////
      //Almaceno las URLs de las imagenes que hay que eliminar
      let urlsDeleteImages = [];
      urlsDeleteImages = product.image.filter((el)=> !notDeleteImages.includes(el)); //Me devuelve todas las imagenes a eliminar.
      const deletedImages = await deleteImages(urlsDeleteImages); //Elimino de la nube de Cloudinary las imagenes.
      if(!deletedImages){
        throw new Error("Error al eliminar imagenes de la nube de Cloudinary");
      }

      /////Agrego a newData todas las Urls de las imagenes (Las nuevas y las viejas que NO hay que eliminar);
      newData = {...newData, image: notDeleteImages.concat(newImages)};

      ///Actualizo la instancia en la base de datos.
      await product.update(newData, {
          transaction: t
      });
      
      await t.commit(); // Confirmar la transacción
      res.send("Producto de Nutrifit actualizado con éxito");
    } catch (error) {
      await t.rollback(); // Deshacer cambios si hubo un error
      console.log(error);
      res.status(400).send(error.message);
  }
}


export default putNutrifit;






