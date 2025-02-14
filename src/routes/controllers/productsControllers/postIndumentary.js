import { sequelize, IndumentaryType, ProductIndumentary } from '../../../../database/models/index.js';
import { loadImage } from '../../functionsAux/cloudinaryFunctions.js';

const postIndumentary = async (req, res)=>{
    const t = await sequelize.transaction(); // Iniciar una transacción
    try {
        const data = JSON.parse(req.body.data);
        let type;
        type = await IndumentaryType.findOne({
            where: { name : data.type},
            transaction: t
        })
        if(!type){ // Si no existe instancia con name = data.type en la tabla IndumentaryType, entonces la creo
            type = await IndumentaryType.create( { name: data.type }, {
                transaction: t
            })
        }
        const images = await loadImage(req.files); //Cargo imagenes a Cloudinary
        const newData = {...data, images: images};
        const newProduct = await ProductIndumentary.create(newData, {
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

export default postIndumentary;