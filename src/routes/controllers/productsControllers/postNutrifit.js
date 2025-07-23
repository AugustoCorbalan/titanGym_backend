import { sequelize, ProductNutrifit, NutrifitType } from '../../../../database/models/index.js';
import { loadImage } from '../../functionsAux/cloudinaryFunctions.js';

const postNutrifit = async (req, res)=>{
    console.log("Ingresó...")
    const t = await sequelize.transaction(); // Iniciar una transacción
    try {
        const data = JSON.parse(req.body.data);
        console.log(data);
        let type;
        type = await NutrifitType.findOne({
            where: { name : data.type},
            transaction: t
        })
        if(!type){ // Si no existe instancia con name = data.type en la tabla IndumentaryType, entonces la creo
            type = await NutrifitType.create( { name: data.type }, {
                transaction: t
            })
        }

        const images = await loadImage(req.files); //Cargo imagenes a Cloudinary
        const newData = {...data, image: images};
        const newProduct = await ProductNutrifit.create(newData, {
            transaction: t
        }); // Instancio el producto en la bd;

        await newProduct.setProductType(type, {
            transaction: t
        });
        console.log("esperando confirmación..")
        await t.commit(); // Confirmar la transacción
        console.log("Producto de Nutrifit agregado con éxito");
        res.send("Producto de Nutrifit agregado con éxito");
    } catch (error) {
        await t.rollback(); // Deshacer cambios si hubo un error
        console.log(error);
        res.status(400).send(error.message);
    }
}

export default postNutrifit;