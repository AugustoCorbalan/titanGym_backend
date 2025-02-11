import { Router } from 'express';
import userRouth from './users.routes.js';
import authRouth from './auth.routes.js';
import activityRouth from './activities.routes.js';
import membershipRouth from './membership.routes.js';
import debtRouth from './debt.routes.js';
import productsRouth from './products.routes.js';
import buyRouth from './buys.routes.js';
import paymentRouth from './payment.routes.js';

const router = Router();

router.use('/user', userRouth);
router.use('/auth', authRouth);
router.use('/activity', activityRouth);
router.use('/membership', membershipRouth);
router.use('/debts', debtRouth);
router.use('/products', productsRouth);
router.use('/buys', buyRouth);
router.use('/payments', paymentRouth);

export default router;