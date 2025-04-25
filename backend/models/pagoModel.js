const pool = require('../config/db');

const PagoModel = {
  obtenerPorUsuario: async (usuario_id) => {
    const res = await pool.query(
      'SELECT * FROM "Pagos" WHERE usuario_id = $1',
      [usuario_id]
    );
    return res.rows;
  },

  registrar: async ({ usuario_id, monto, fecha, estado }) => {
    const res = await pool.query(
      'INSERT INTO "Pagos" (usuario_id, monto, fecha, estado) VALUES ($1, $2, $3, $4) RETURNING *',
      [usuario_id, monto, fecha, estado]
    );
    return res.rows[0];
  }
};

module.exports = PagoModel;
