import { MercadoPagoConfig } from "mercadopago";
import dotenv from 'dotenv'
dotenv.config()
const {PROD_ACCESS_TOKEN_MP} = process.env;

// Agrega credenciales

const mercadopago = new MercadoPagoConfig({
	accessToken: PROD_ACCESS_TOKEN_MP,
});

export default mercadopago;