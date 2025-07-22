import { Router } from "express";
import { createPreferenceProduct } from "./controllers/mercadopagoControllers/createPreferenceProduct.js";
import { createPreferenceBill } from "./controllers/mercadopagoControllers/createPreferenceBill.js";
import { postNotificationsProducts } from "./controllers/mercadopagoControllers/postNotificationsProducts.js";
import { postNotificationsBills } from "./controllers/mercadopagoControllers/postNotificationsBills.js";

const router = Router();

router.post('/createPreferenceProduct', (req, res)=> createPreferenceProduct(req, res));
router.post('/createPreferenceBill', (req, res)=> createPreferenceBill(req, res));
//Rutas de recepción de notificación MP para compras de PRODUCTS:
router.post('/payments/products', (req, res)=> postNotificationsProducts(req, res));
router.get('/payments/products', (req, res)=> postNotificationsProducts(req, res));
//Rutas de recepción de notificación MP para pagos de Facturas de membresías:
router.post('/payments/bills', (req, res)=> postNotificationsBills(req, res));
router.get('/payments/bills', (req, res)=> postNotificationsBills(req, res));

export default router;