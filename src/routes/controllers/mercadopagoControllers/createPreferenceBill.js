import { Debt, User} from '../../../../database/models/index.js';
import { Preference } from 'mercadopago';
import client from '../../../utils/mercadopagoConfig.js';
import dotenv from 'dotenv';

dotenv.config();

const { BASE_URL_BACKEND_PUBLIC } = process.env;

export const createPreferenceBill = async (req, res)=>{
    const preference = new Preference(client);
    
    const { bill_id} = req.body;

    const response = await Debt.findByPk(bill_id,{ include: {
        model: User,
        attributes: ['name', 'lastName'] // solo traés el campo 'nombre' del usuario
    }});
    const bill_data = response.dataValues;
    const data_user = bill_data.User.dataValues;

    const periodo = `${bill_data.startDate} - ${bill_data.endDate}`;

    let preferences = {
        items: [
            {
                title: `Factura del período: ${periodo}`,
                unit_price: parseFloat(bill_data.amount),
                quantity: 1,
                currency_id: "ARS",
                description: `Factura del período ${periodo} correspondiente al alumno ${data_user.name} ${data_user.lastName}`
            }
        ],
        metadata: {
            bill_id
        },
        back_urls: {
            failure: "https://www.gimnasiotitan.com.ar",
            pending: "https://www.gimnasiotitan.com.ar", 
            success: "https://www.gimnasiotitan.com.ar"
        },
        notification_url: `${BASE_URL_BACKEND_PUBLIC}/mercadopago/payments/bills?source_news=webhooks`
    };

    try {
        const response =  await preference.create({
            body: preferences
        });
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }      
}