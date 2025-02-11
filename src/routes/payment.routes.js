import { Router } from "express";
import { authenticateToken } from "./middleware/authenticateToken.js";
import getAllPayments from "./controllers/paymentControllers/getAllPayments.js";

const router = Router();

router.get('/allPayments', authenticateToken, (req, res)=> getAllPayments(req, res));

export default router; 