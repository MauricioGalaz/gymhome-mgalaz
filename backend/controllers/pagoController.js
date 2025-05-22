import pagoModel from '../models/pagoModel.js';
import pool from '../config/db.js'; 

const pagoController = {
  obtenerPagos: async (req, res, next) => {
    try {
      const pagos = await pagoModel.obtenerTodos();
      res.json(pagos);
    } catch (error) {
      next(error);
    }
  },

  listarPorUsuario: async (req, res, next) => {
    try {
      const { id_usuarios } = req.params;
      const pagos = await pagoModel.obtenerPorUsuario(id_usuarios);
      res.json(pagos);
    } catch (error) {
      next(error);
    }
  },

  actualizarEstado: async (req, res, next) => {
    try {
      const { id_pagos } = req.params;
      const { estado } = req.body;
      const pagoActualizado = await pagoModel.actualizarEstado(id_pagos, estado);
      if (pagoActualizado) {
        res.json(pagoActualizado);
      } else {
        res.status(404).json({ mensaje: 'Pago no encontrado' });
      }
    } catch (error) {
      next(error);
    }
  },

  eliminarPago: async (req, res) => {
  const id = req.params.id;

  try {
    const resultado = await pool.query('DELETE FROM pagos WHERE id_pagos = $1', [id]);

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Pago no encontrado' });
    }

    res.json({ mensaje: 'Pago eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar pago:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el pago' });
  }
},

  registrar: async (req, res, next) => {
    try {
      const nuevoPago = await pagoModel.registrar(req.body);
      res.status(201).json(nuevoPago);
    } catch (error) {
      next(error);
    }
  }
};

export default pagoController;

