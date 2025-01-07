import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const getAuthGoogleCallback = async (req, res)=>{
  try {
    const user = req.user.dataValues; // Usuario autenticado por Passport
    // Genera un token JWT
    const token = jwt.sign(
      { id : user.googleId },
      process.env.JWT_SECRET,
      { expiresIn: '1h'}
    );
    res.redirect(`http://localhost:3000/auth/success?token=${token}`);
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed'});
  }
};

export default getAuthGoogleCallback;