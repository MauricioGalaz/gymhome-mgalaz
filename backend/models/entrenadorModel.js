import pool from '../config/db.js'; 

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

  obtenerEntrenadores: async () => {  
    try {
      const result = await pool.query('SELECT * FROM entrenadores');
      return result.rows;
    } catch (err) {
      console.error('Error al obtener entrenadores:', err.message);
      throw err;
    }
  },

  eliminar: async (id) => {
    await pool.query('DELETE FROM entrenadores WHERE id = $1', [id]);
  }
};

export default EntrenadorModel;

