import pool from '../config/db.js';

const ejercicioModel = {
  obtenerTodos: async () => {
    const result = await pool.query('SELECT * FROM ejercicios');
    return result.rows;
  },

  obtenerPorId: async (id) => {
    const result = await pool.query('SELECT * FROM ejercicios WHERE id = $1', [id]);
    return result.rows[0];
  },

  crear: async ({ nombre, descripcion, tipo, duracion }) => {
    const result = await pool.query(
      'INSERT INTO ejercicios (nombre, descripcion, tipo, duracion) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, descripcion, tipo, duracion]
    );
    return result.rows[0];
  },

  actualizar: async (id, { nombre, descripcion, tipo, duracion }) => {
    const result = await pool.query(
      'UPDATE ejercicios SET nombre = $1, descripcion = $2, tipo = $3, duracion = $4 WHERE id = $5 RETURNING *',
      [nombre, descripcion, tipo, duracion, id]
    );
    return result.rows[0];
  },

  eliminar: async (id) => {
    const result = await pool.query('DELETE FROM ejercicios WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

export default ejercicioModel;
