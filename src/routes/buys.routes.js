import { Router } from "express";
import { authenticateToken } from "./middleware/authenticateToken.js";
import getAllBuys from "./controllers/buysControllers/getAllBuys.js";

const router = Router();

router.get('/allBuys', authenticateToken, (req, res)=> getAllBuys(req, res));

export default router; 