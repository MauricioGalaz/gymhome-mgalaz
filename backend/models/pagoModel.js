import pool from '../config/db.js';

const pagoModel = {
 
  obtenerTodos: async () => {
    const res = await pool.query(`
      SELECT pagos.*, usuarios.nombre AS nombre_usuario
      FROM pagos
      JOIN usuarios ON pagos.id_usuarios = usuarios.id_usuarios
    `);
    return res.rows;
  },

 
  obtenerPorUsuario: async (id_usuarios) => {
    const res = await pool.query(
      `
      SELECT pagos.*, usuarios.nombre AS nombre_usuario
      FROM pagos
      JOIN usuarios ON pagos.id_usuarios = usuarios.id_usuarios
      WHERE pagos.id_usuarios = $1
      `,
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

  // Actualizar el estado del pago
  actualizarEstado: async (id_pagos, estado) => {
    const res = await pool.query(
      'UPDATE pagos SET estado = $1 WHERE id_pagos = $2 RETURNING *',
      [estado, id_pagos]
    );
    return res.rows[0];
  }
};

export default pagoModel;
