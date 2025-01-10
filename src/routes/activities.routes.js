import { Router } from "express";
import getAllActivities from './controllers/activitiesControllers/getAllActivities.js';
import getActivity from './controllers/activitiesControllers/getActivity.js';
import postActivity from './controllers/activitiesControllers/postActivity.js';

const router = Router();

router.get('/', (req, res)=> getActivity(req, res));
router.get('/allActivities', (req, res)=> getAllActivities(req, res));
router.post('/', (req, res)=> postActivity(req, res));

export default router; 