import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No hay token.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verified;  // agregar datos del usuario al request
    next();
  } catch (error) {
    res.status(400).json({ mensaje: 'Token no válido' });
  }
};
