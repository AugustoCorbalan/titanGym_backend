import { Router } from "express";
import { authenticateToken } from "./middleware/authenticateToken.js";
import getAllDebts from "./controllers/debtControllers/getAllDebts.js";
import getDebtsOfUser from "./controllers/debtControllers/getDebtsOfUser.js";

const router = Router();

router.get('/allDebts', (req, res)=> getAllDebts(req, res));
router.get('/allDebtsOfUser', authenticateToken,(req, res) => getDebtsOfUser(req, res));

export default router; 