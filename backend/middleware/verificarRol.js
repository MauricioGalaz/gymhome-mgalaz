export const verificarRol = (rolRequerido) => {
  return (req, res, next) => {
    const { rol } = req.usuario;

    if (rol !== rolRequerido) {
      return res.status(403).json({ mensaje: 'Acceso denegado. No tienes el rol adecuado.' });
    }

    next();
  };
};
