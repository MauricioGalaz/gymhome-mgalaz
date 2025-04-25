const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  //  token del encabezado Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado, token no proporcionado' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; 
    next();
  } catch (error) {
    console.error('Error en verificarToken:', error);
    res.status(401).json({ mensaje: 'Token no válido' });
  }
};

module.exports = verificarToken;
