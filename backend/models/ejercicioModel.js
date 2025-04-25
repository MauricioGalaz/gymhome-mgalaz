const pool = require('../config/db');

const EjercicioModel = {
  obtenerTodos: async () => {
    const res = await pool.query('SELECT * FROM "Ejercicios"');
    return res.rows;
  },

  crear: async ({ nombre, descripcion, tipo, instrucciones }) => {
    const res = await pool.query(
      'INSERT INTO "Ejercicios" (nombre, descripcion, tipo, instrucciones) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, descripcion, tipo, instrucciones]
    );
    return res.rows[0];
  }
};

module.exports = EjercicioModel;
