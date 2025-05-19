import pool from '../config/db.js';

const pagoModel = {
  // Obtener todos los pagos junto al nombre del usuario
obtenerTodos: async () => {
  const res = await pool.query(
    `SELECT pagos.*, usuarios.nombre AS nombre_usuario
     FROM pagos
     JOIN usuarios ON pagos.id_usuarios = usuarios.id_usuarios
     ORDER BY pagos.id_pagos ASC`
  );
  return res.rows;
},




  // Obtener pagos por usuario específico
obtenerPorUsuario: async (id_usuarios) => {
  const res = await pool.query(
    `SELECT pagos.*, usuarios.nombre AS nombre_usuario
     FROM pagos
     JOIN usuarios ON pagos.id_usuarios = usuarios.id_usuarios
     WHERE pagos.id_usuarios = $1
     ORDER BY pagos.id_pagos ASC`,
    [id_usuarios]
  );
  return res.rows;
},



  // Registrar un nuevo pago
  registrar: async ({ id_usuarios, monto, fecha, estado }) => {
    const res = await pool.query(
      'INSERT INTO pagos (id_usuarios, monto, fecha, estado) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_usuarios, monto, fecha, estado]
    );
    return res.rows[0];
  },

  // Actualizar el estado de un pago
  actualizarEstado: async (id_pagos, estado) => {
    const res = await pool.query(
      'UPDATE pagos SET estado = $1 WHERE id_pagos = $2 RETURNING *',
      [estado, id_pagos]
    );
    return res.rows[0];
  }
};

export default pagoModel;
