const pool = require('../config/db');

const PlanModel = {
  obtenerTodos: async () => {
    const res = await pool.query('SELECT * FROM "PlanesEntrenamiento"');
    return res.rows;
  },

  crear: async (plan) => {
    const { nombre, descripcion, duracion, precio } = plan;
    const res = await pool.query(
      'INSERT INTO "PlanesEntrenamiento" (nombre, descripcion, duracion, precio) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, descripcion, duracion, precio]
    );
    return res.rows[0];
  },

  obtenerPorId: async (id) => {
    const res = await pool.query('SELECT * FROM "PlanesEntrenamiento" WHERE id = $1', [id]);
    return res.rows[0];
  },

  eliminar: async (id) => {
    await pool.query('DELETE FROM "PlanesEntrenamiento" WHERE id = $1', [id]);
  }
};

module.exports = PlanModel;
