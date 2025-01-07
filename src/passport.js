import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import User from '../database/models/user.js';
import dotenv from 'dotenv';
dotenv.config();

//CONFIGURACIÓN AUTENTICACIÓN GOOGLE ///////////////////////////////
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done)=>{
    try {
      // Busco el usuario en mi base de datos
      let user = await User.findOne({ where: { googleId: profile.id } });
      // Si no existe lo creo
      if(!user){
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.name.givenName,
          lastName: profile.name.familyName,
          picture: profile.photos[0].value,
        });
      }
      // Pasamos el usuario autenticado y el "null" indica que no hay Errores
      return done(null, user);
    } catch (error) {
        return done(error)
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
