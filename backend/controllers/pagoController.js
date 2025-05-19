import pagoModel from '../models/pagoModel.js';

const pagoController = {

  // Obtener todos los pagos con nombre del usuario
  obtenerPagos: async (req, res, next) => {
    try {
      const pagos = await pagoModel.obtenerTodos();
      res.json(pagos);
    } catch (error) {
      next(error);
    }
  },

  // Obtener pagos de un usuario específico
  listarPorUsuario: async (req, res, next) => {
    try {
      const { id_usuarios } = req.params;
      const pagos = await pagoModel.obtenerPorUsuario(id_usuarios);
      res.json(pagos);
    } catch (error) {
      next(error);
    }
  },

  // Registrar un nuevo pago
  registrar: async (req, res, next) => {
    try {
      const nuevoPago = await pagoModel.registrar(req.body);
      res.status(201).json(nuevoPago);
    } catch (error) {
      next(error);
    }
  },

  // Actualizar estado de un pago
  actualizarEstado: async (req, res, next) => {
    try {
      const { id_pagos } = req.params;
      const { estado } = req.body;
      const pagoActualizado = await pagoModel.actualizarEstado(id_pagos, estado);
      res.json(pagoActualizado);
    } catch (error) {
      next(error);
    }
  }
};

export default pagoController;
