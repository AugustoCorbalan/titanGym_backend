import { Router } from 'express';
import getAllMemberships from './controllers/membershipControllers/getAllMemberships.js';
import postMembership from './controllers/membershipControllers/postMembership.js';

const router = Router();

router.get('/getAllMemberships', (req, res)=> getAllMemberships(req, res));
router.post('/', (req, res)=> postMembership(req, res));

export default router;