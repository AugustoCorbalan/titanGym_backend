import { Router } from "express";
import verifyToken from "./functionsAux/verifyToken.js";
import getAllActivities from './controllers/activitiesControllers/getAllActivities.js';
import getActivity from './controllers/activitiesControllers/getActivity.js';
import postActivity from './controllers/activitiesControllers/postActivity.js';
import deleteActivity from './controllers/activitiesControllers/deleteActivity.js';
import putActivity from './controllers/activitiesControllers/putActivity.js';

const router = Router();

router.get('/', (req, res)=> getActivity(req, res));
router.get('/allActivities', (req, res)=> getAllActivities(req, res));
router.post('/', (req, res)=> postActivity(req, res));
router.delete('/deleteActivity', verifyToken, (req, res)=> deleteActivity(req, res));
router.put('/updateActivity', verifyToken, (req, res)=> putActivity(req, res));

export default router; 