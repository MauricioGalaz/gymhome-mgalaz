// models/pagoModel.js
import pool from '../config/db.js';

const pagoModel = {
  obtenerTodos: async () => {
    const res = await pool.query('SELECT * FROM pagos');
    return res.rows;
  },

  obtenerPorUsuario: async (id_usuarios) => {
    const res = await pool.query(
      'SELECT * FROM pagos WHERE id_usuarios = $1',
      [id_usuarios]
    );
    return res.rows;
  },

  registrar: async ({ id_usuarios, monto, fecha, estado }) => {
    const res = await pool.query(
      'INSERT INTO pagos (id_usuarios, monto, fecha, estado) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_usuarios, monto, fecha, estado]
    );
    return res.rows[0];
  },

  actualizarEstado: async (id_pagos, estado) => {
    const res = await pool.query(
      'UPDATE pagos SET estado = $1 WHERE id_pagos = $2 RETURNING *',
      [estado, id_pagos]
    );
    return res.rows[0];
  }
};

export default pagoModel;
