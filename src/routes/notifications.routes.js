import { Router } from "express";
import verifyToken from "./functionsAux/verifyToken.js";
import getLatestNotificationsForUser from "./controllers/notificationsControllers/getLatestNotificationsForUser.js";
const router = Router();

router.get('/getLatestNotifications', verifyToken, (req, res)=> getLatestNotificationsForUser(req, res));

export default router;