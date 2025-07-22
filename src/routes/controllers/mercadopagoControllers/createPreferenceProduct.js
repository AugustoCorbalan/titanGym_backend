import { ProductIndumentary, NutrifitType, ProductNutrifit } from '../../../../database/models/index.js';
import { Preference } from 'mercadopago';
import client from '../../../utils/mercadopagoConfig.js';
import dotenv from 'dotenv';

dotenv.config();

const { BASE_URL_BACKEND_PUBLIC } = process.env;

export const createPreferenceProduct = async (req, res)=>{
    const preference = new Preference(client);
    
    const { idProduct, typeProduct ,size, googleId} = req.body;
    let dataProduct;
    if (typeProduct == "Indumentary"){
        dataProduct = await ProductIndumentary.findByPk(idProduct);
    }else if(typeProduct == "Nutrifit"){
        dataProduct = await ProductNutrifit.findByPk(idProduct);
    }
    let preferences = {
        items: [
            {
                id: idProduct,
                title: dataProduct.name,
                unit_price: parseFloat(dataProduct.cost),
                quantity:1,
                currency_id: "ARS",
                description: `Compra de 1 ${dataProduct.name} tamaño ${size}`
            }
        ],
        metadata: {
            googleId,
            typeProduct,
            size,
            idProduct,
        },
        back_urls: {
            failure: "https://www.gimnasiotitan.com.ar",
            pending: "https://www.gimnasiotitan.com.ar", 
            success: "https://www.gimnasiotitan.com.ar"
        },
        notification_url: `${BASE_URL_BACKEND_PUBLIC}/mercadopago/payments/products?source_news=webhooks`
    };

    try {
        const response =  await preference.create({
            body: preferences
        });
        console.log("Preference", response);
        res.status(200).send(response.id);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }      
}