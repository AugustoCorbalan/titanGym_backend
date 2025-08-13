import { Router } from 'express';
import {dailyUpdater} from './controllers/jobsControllers/dailyUpdater.js';
import { sendNotifications } from './controllers/jobsControllers/sendNotifications.js';

const router = Router();

router.get('/dailyUpdater', (req, res)=> dailyUpdater(req, res));
router.get('/sendNotifications', (req, res)=> sendNotifications(req, res));

export default router;