const ProgresoModel = require('../models/progresoModel');

const ProgresoController = {
  listarPorUsuario: async (req, res) => {
    try {
      const datos = await ProgresoModel.obtenerPorUsuario(req.params.usuario_id);
      res.json(datos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener progreso' });
    }
  },

  registrar: async (req, res) => {
    try {
      const nuevo = await ProgresoModel.registrar(req.body);
      res.status(201).json(nuevo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al registrar progreso' });
    }
  }
};

module.exports = ProgresoController;
