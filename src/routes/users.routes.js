import { Router } from "express";
import verifyToken from './functionsAux/verifyToken.js';
import getAllUsers from './controllers/userControllers/getAllUsers.js';
import getUser from './controllers/userControllers/getUser.js';
import postUser from './controllers/userControllers/postUser.js';

const router = Router();

router.get('/', verifyToken, (req, res)=> getUser(req, res));
router.get('/allUsers', (req, res)=> getAllUsers(req, res));
router.post('/', (req, res)=> postUser(req, res));

export default router; 