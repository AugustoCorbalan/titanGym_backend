import { Router } from 'express';
import getAllMemberships from './controllers/membershipControllers/getAllMemberships.js';
import postMembership from './controllers/membershipControllers/postMembership.js';
import verifyToken from './functionsAux/verifyToken.js';

const router = Router();

router.get('/getAllMemberships', verifyToken, (req, res)=> getAllMemberships(req, res));
router.post('/', (req, res)=> postMembership(req, res));

export default router;