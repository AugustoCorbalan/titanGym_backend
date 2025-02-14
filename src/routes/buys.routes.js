import { Router } from "express";
import { authenticateToken } from "./middleware/authenticateToken.js";
import getAllBuys from "./controllers/buysControllers/getAllBuys.js";
import postLoadManuallyBuy from "./controllers/buysControllers/postLoadManuallyBuy.js"

const router = Router();

router.get('/allBuys', authenticateToken, (req, res)=> getAllBuys(req, res));
router.post('/loadManuallyBuy', authenticateToken, (req, res)=> postLoadManuallyBuy(req, res));

export default router; 