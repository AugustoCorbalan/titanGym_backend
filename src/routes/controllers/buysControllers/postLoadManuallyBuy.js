import { User, Buy, ProductIndumentary, ProductNutrifit } from '../../../../database/models/index.js';
import { verifyUserIsAdmin } from '../../functionsAux/verifyUserIsAdmin.js';

const postLoadManuallyBuy = async (req, res)=>{
    try {
        const data = req.body;
        const user = req.user;
        if(verifyUserIsAdmin(user)){
            let product;
            if(data.typeProduct == 'Indumentary'){
                product = await ProductIndumentary.findByPk(data.productId);
            }else if (data.typeProduct == 'Nutrifit'){
                product = await ProductNutrifit.findByPk(data.productId);
            }
            const newBuy = await Buy.create({
                amount: (product.cost * data.cant),
                buyDate: data.buyDate,
                userId: (data.userId != "") ? data.userId : null,
                cant: data.cant
            });
            
            await newBuy.addProductIndumentary(data.productId);
            
        }else{
            throw new error("El usuario solicitante no tiene los permisos necesarios.")
        }
        res.status(200).send("Venta cargada!");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default postLoadManuallyBuy;