import { Router } from "express";
import verifyToken from "./functionsAux/verifyToken.js";
import getLatestNotificationsForUser from "./controllers/notificationsControllers/getLatestNotificationsForUser.js";
import postNotification from "./controllers/notificationsControllers/postNotification.js";
import setNotificationViewed from "./controllers/notificationsControllers/setNotificationViewed.js";
const router = Router();

router.get('/getLatestNotifications', verifyToken, (req, res)=> getLatestNotificationsForUser(req, res));
router.post('/createNotification', verifyToken, (req, res)=> postNotification(req, res));
router.put('/setNotificationViewed', verifyToken, (req, res)=> setNotificationViewed(req, res));

export default router;