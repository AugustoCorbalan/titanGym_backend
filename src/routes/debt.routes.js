import { Router } from "express";

import getAllDebts from "./controllers/debtControllers/getAllDebts.js";

const router = Router();

router.get('/allDebts', (req, res)=> getAllDebts(req, res));

export default router; 