import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  // Obtener el token del header 'Authorization'
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token no encontrado' });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    // Si es válido, el payload estará en decoded
    req.user = decoded;
    next();
  });
};

export default verifyToken;