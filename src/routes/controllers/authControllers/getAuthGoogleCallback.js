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
    // // Redirección con token en cookie segura
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "Strict",
    // });
    res.redirect(`${process.env.BASE_URL_FRONTEND}/auth/success?token=${token}`);
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed'});
  }
};

export default getAuthGoogleCallback;