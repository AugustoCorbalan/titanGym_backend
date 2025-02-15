import { Router } from "express";
import verifyToken from "./functionsAux/verifyToken.js";
import getAllProducts from './controllers/productsControllers/getAllProducts.js';
import getAllIndumentary from './controllers/productsControllers/getAllIndumentary.js';
import getAllNutrifit from './controllers/productsControllers/getAllNutrifit.js';
import postIndumentary from './controllers/productsControllers/postIndumentary.js';
import postNutrifit from './controllers/productsControllers/postNutrifit.js';
import putIndumentary from "./controllers/productsControllers/putIndumentary.js";
import deleteIndumentary from "./controllers/productsControllers/deleteIndumentary.js";

const router = Router();

router.get('/allProducts', (req, res)=> getAllProducts(req, res));
router.get('/allIndumentary', (req, res)=> getAllIndumentary(req, res));
router.get('/allNutrifit', (req, res)=> getAllNutrifit(req, res));
router.post('/indumentary', (req, res)=> postIndumentary(req, res));
router.post('/nutrifit', (req, res)=> postNutrifit(req, res));
router.put('/putIndumentary', verifyToken, (req, res)=> putIndumentary(req, res));
router.delete('/deleteIndumentary', verifyToken, (req, res)=> deleteIndumentary(req, res));

export default router; 