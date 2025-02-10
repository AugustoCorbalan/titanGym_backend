import { sequelize, IndumentaryType, ProductIndumentary } from '../../../../database/models/index.js';
import { loadImage } from '../../functionsAux/loadImage.js';

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
            type = IndumentaryType.create( { name: data.type }, {
                transaction: t
            })
        }
        const newData = await loadImage(req.files, data); //Cargo imagenes a Cloudinary
        console.log("newData", newData);
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