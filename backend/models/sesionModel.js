const pool = require('../config/db');

const SesionModel = {
  obtenerPorUsuario: async (usuario_id) => {
    const res = await pool.query(
      'SELECT * FROM "Sesiones" WHERE usuario_id = $1',
      [usuario_id]
    );
    return res.rows;
  },

  crear: async ({ usuario_id, entrenador_id, fecha, duracion }) => {
    const res = await pool.query(
      'INSERT INTO "Sesiones" (usuario_id, entrenador_id, fecha, duracion) VALUES ($1, $2, $3, $4) RETURNING *',
      [usuario_id, entrenador_id, fecha, duracion]
    );
    return res.rows[0];
  }
};

module.exports = SesionModel;
