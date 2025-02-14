import { ProductNutrifit, NutrifitType } from '../../../../database/models/index.js';
import { loadImage } from '../../functionsAux/cloudinaryFunctions.js';

const postNutrifit = async (req, res)=>{
    const t = await sequelize.transaction(); // Iniciar una transacción
    try {
        const data = JSON.parse(req.body.data);
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
        const newData = await loadImage(req.files, data); //Cargo imagenes a Cloudinary
        const newProduct = await ProductNutrifit.create(newData, {
            transaction: t
        }); // Instancio el producto en la bd;

        await newProduct.setProductType(type, {
            transaction: t
        });
        await t.commit(); // Confirmar la transacción
        res.send("Producto de Indumentaria agregado con éxito");
    } catch (error) {
        await t.rollback(); // Deshacer cambios si hubo un error
        res.status(400).send(error.message);
    }
}

export default postNutrifit;