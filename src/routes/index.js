import { Router } from 'express';
import userRouth from './users.routes.js';
import authRouth from './auth.routes.js';
const router = Router();

router.use('/user', userRouth);
router.use('/auth', authRouth);

export default router;