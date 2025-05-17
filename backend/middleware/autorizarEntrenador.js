export const autorizarEntrenador = (req, res, next) => {
    if (req.usuario?.rol !== 'entrenador') {
      return res.status(403).json({ mensaje: 'Acceso denegado: solo para entrenadores' });
    }
    next();
  };
  
