import PagoModel from '../models/pagoModel.js';

const PagoController = {
  // Listar pagos por usuario
  listarPorUsuario: async (req, res) => {
    try {
      const pagos = await PagoModel.obtenerPorUsuario(req.params.usuario_id);
      res.json(pagos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener pagos' });
    }
  },

  // Registrar un nuevo pago
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

export default PagoController;
