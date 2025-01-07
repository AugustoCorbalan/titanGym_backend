import passport from '../../../passport.js';

const getAuthGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

export default getAuthGoogle;