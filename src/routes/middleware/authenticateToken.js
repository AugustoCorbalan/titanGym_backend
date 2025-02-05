import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    const {JWT_SECRET} = process.env;
    if (!token) {
        return res.status(401).json({ error: 'Token requerido' });
    }

    // Quitamos el "Bearer " si existe, dejando solo el token
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(tokenWithoutBearer, JWT_SECRET, (err, user) => {
        if (err) {
            console.log('error token no valido')
            return res.status(403).json({ error: 'Token no válido' });
        }
        // Guardamos el user en la solicitud para usarlo después
        req.user = user;
        next();  // Continuamos al siguiente middleware o ruta
    });
};