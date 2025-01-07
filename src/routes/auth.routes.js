import passport from "../passport.js";
import { Router } from "express";
import getAuthGoogle from './controllers/authControllers/getAuthGoogle.js';
import getAuthGoogleCallback from "./controllers/authControllers/getAuthGoogleCallback.js";

const router = Router();

router.get('/google', getAuthGoogle);
router.get('/google/callback',
        passport.authenticate('google', {session: false}),
        getAuthGoogleCallback
    );

export default router; 