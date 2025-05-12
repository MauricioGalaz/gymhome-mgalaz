// controllers/pagoController.js
import pagoModel from '../models/pagoModel.js';

const pagoController = {
  obtenerPagos: async (req, res) => {
    try {
      const pagos = await pagoModel.obtenerTodos();
      res.json(pagos);
    } catch (error) {
      console.error('Error al obtener pagos:', error.message);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  listarPorUsuario: async (req, res) => {
    const { id_usuarios } = req.params;
    try {
      const pagos = await pagoModel.obtenerPorUsuario(id_usuarios);
      if (pagos.length === 0) {
        return res.status(404).json({ mensaje: 'No hay pagos para este usuario' });
      }
      res.json(pagos);
    } catch (error) {
      console.error('Error al listar pagos por usuario:', error.message);
      res.status(500).json({ mensaje: 'Error interno' });
    }
  },

registrar: async (req, res) => {
  const { nombre_usuario, monto, fecha, estado } = req.body;

  try {
    // Buscar ID del usuario por su nombre
    const usuarioResult = await pool.query(
      'SELECT id_usuarios FROM usuarios WHERE nombre = $1',
      [nombre_usuario]
    );

    if (usuarioResult.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const id_usuarios = usuarioResult.rows[0].id_usuarios;

    // Registrar el pago con el ID encontrado
    const result = await pool.query(`
  SELECT p.id_pagos, u.nombre AS nombre_usuario, p.monto, p.fecha, p.estado
  FROM pagos p
  JOIN usuarios u ON p.id_usuarios = u.id_usuarios
  ORDER BY p.id_pagos
`);


    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al registrar pago:', error.message);
    res.status(500).json({ mensaje: 'Error al registrar pago' });
  }
},

  actualizarEstado: async (req, res) => {
    const { id_pagos } = req.params;
    const { estado } = req.body;
    try {
      const pagoActualizado = await pagoModel.actualizarEstado(id_pagos, estado);
      if (!pagoActualizado) {
        return res.status(404).json({ mensaje: 'Pago no encontrado' });
      }
      res.json({ mensaje: 'Estado actualizado', pago: pagoActualizado });
    } catch (error) {
      console.error('Error al actualizar estado:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar estado' });
    }
  }
};

export default pagoController;
