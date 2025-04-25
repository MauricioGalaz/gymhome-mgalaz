const SesionModel = require('../models/sesionModel');

const SesionController = {
  listarPorUsuario: async (req, res) => {
    try {
      const sesiones = await SesionModel.obtenerPorUsuario(req.params.usuario_id);
      res.json(sesiones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener sesiones' });
    }
  },

  crear: async (req, res) => {
    try {
      const nueva = await SesionModel.crear(req.body);
      res.status(201).json(nueva);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear sesión' });
    }
  }
};

module.exports = SesionController;
