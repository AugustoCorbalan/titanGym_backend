import { Router } from "express";
import verifyToken from './functionsAux/verifyToken.js';
import getAllUsers from './controllers/userControllers/getAllUsers.js';
import getUser from './controllers/userControllers/getUser.js';
import postUser from './controllers/userControllers/postUser.js';
import postActivityForUser from './controllers/userControllers/postActivityForUser.js';
import setUserAsAdmin from "./controllers/userControllers/setUserAsAdmin.js";
import getAllUsersCompletedInfo from "./controllers/userControllers/getAllUsersCompletedInfo.js";

const router = Router();

router.get('/', verifyToken, (req, res)=> getUser(req, res));
router.get('/allUsers', (req, res)=> getAllUsers(req, res));
router.get('/getAllUsersCompletedInfo', verifyToken, (req, res)=> getAllUsersCompletedInfo(req, res));
router.post('/', (req, res)=> postUser(req, res));
router.post('/postActivityForUser', (req, res)=> postActivityForUser(req, res));
router.put('/setUserAsAdmin', (req, res)=> setUserAsAdmin(req, res));

export default router;