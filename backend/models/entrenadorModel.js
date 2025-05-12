import pool from '../config/db.js';

const entrenadorModel = {
  listar: async () => {
    try {
      const result = await pool.query('SELECT * FROM entrenadores');
      return result.rows;
    } catch (err) {
      console.error('Error al listar entrenadores:', err.message);
      throw err;
    }
  },

  crear: async (entrenador) => {
    const { nombre, especialidad, disponibilidad } = entrenador;
    const res = await pool.query(
      'INSERT INTO entrenadores (nombre, especialidad, disponibilidad) VALUES ($1, $2, $3) RETURNING *',
      [nombre, especialidad, disponibilidad]
    );
    return res.rows[0];
  },

  obtener: async (id) => {
    const res = await pool.query('SELECT * FROM entrenadores WHERE id = $1', [id]);
    return res.rows[0];
  },

  actualizar: async (id, entrenador) => {
    const { nombre, especialidad, disponibilidad } = entrenador;
    const res = await pool.query(
      'UPDATE entrenadores SET nombre = $1, especialidad = $2, disponibilidad = $3 WHERE id = $4 RETURNING *',
      [nombre, especialidad, disponibilidad, id]
    );
    return res.rows[0];
  },

  eliminar: async (id) => {
    await pool.query('DELETE FROM entrenadores WHERE id = $1', [id]);
  }
};

export default entrenadorModel;
