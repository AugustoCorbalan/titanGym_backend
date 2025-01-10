import { Router } from 'express';
import userRouth from './users.routes.js';
import authRouth from './auth.routes.js';
import activityRouth from './activities.routes.js';
const router = Router();

router.use('/user', userRouth);
router.use('/auth', authRouth);
router.use('/activity', activityRouth);

export default router;