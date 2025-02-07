import ProductNutrifit from '../../../../database/models/index.js';
import NutrifitType from '../../../../database/models/index.js';
import loadImage from '../../functionsAux/loadImage.js';

const postNutrifit = async (req, res)=>{
    const t = await sequelize.transaction(); // Iniciar una transacción
    try {
        const data = JSON.parse(req.body.data);
        const type = await NutrifitType.findOne({
            where: { name : data.type},
            transaction: t
        })
        await loadImage(req.files, data); //Cargo imagenes a Cloudinary
        const newProduct = await ProductNutrifit.create(data, {
            transaction: t
        }); // Instancio el producto en la bd;

        newProduct.addNutrifitType(type, {
            transaction: t
        });
        await t.commit(); // Confirmar la transacción
        res.send("Producto de Indumentaria agregado con éxito");
    } catch (error) {
        await t.rollback(); // Deshacer cambios si hubo un error
        res.status(400).send(error.message);
    }
}

module.exports = postNutrifit;