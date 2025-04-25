const PagoModel = require('../models/pagoModel');

const PagoController = {
  listarPorUsuario: async (req, res) => {
    try {
      const pagos = await PagoModel.obtenerPorUsuario(req.params.usuario_id);
      res.json(pagos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener pagos' });
    }
  },

  registrar: async (req, res) => {
    try {
      const nuevo = await PagoModel.registrar(req.body);
      res.status(201).json(nuevo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al registrar pago' });
    }
  }
};

module.exports = PagoController;
