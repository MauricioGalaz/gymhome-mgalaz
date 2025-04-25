const pool = require('../config/db');

const EntrenadorModel = {
  obtenerTodos: async () => {
    const res = await pool.query('SELECT * FROM entrenadores');
    return res.rows;
  },

  crear: async (entrenador) => {
    const { nombre, especialidad, disponibilidad } = entrenador;
    const res = await pool.query(
      'INSERT INTO entrenadores (nombre, especialidad, disponibilidad) VALUES ($1, $2, $3) RETURNING *',
      [nombre, especialidad, disponibilidad]
    );
    return res.rows[0];
  },

  obtenerPorId: async (id) => {
    const res = await pool.query('SELECT * FROM entrenadores WHERE id = $1', [id]);
    return res.rows[0];
  },

  eliminar: async (id) => {
    await pool.query('DELETE FROM entrenadores WHERE id = $1', [id]);
  }
};

module.exports = EntrenadorModel;
