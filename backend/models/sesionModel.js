import pool from '../config/db.js'; 
const SesionModel = {
  // obtener sesiones por usuario
  obtenerPorUsuario: async (usuario_id) => {
    const result = await pool.query('SELECT * FROM sesiones WHERE usuario_id = $1', [usuario_id]);
    return result.rows; // Devolver las sesiones encontradas
  },

  // crear una nueva sesión
  crear: async (data) => {
    const { usuario_id, entrenador_id, fecha, duracion } = data;
    const result = await pool.query(
      'INSERT INTO sesiones (usuario_id, entrenador_id, fecha, duracion) VALUES ($1, $2, $3, $4) RETURNING *',
      [usuario_id, entrenador_id, fecha, duracion]
    );
    return result.rows[0]; // Devolver la sesión creada
  },

  // obtener sesión por ID
  obtenerPorId: async (id) => {
    const result = await pool.query('SELECT * FROM sesiones WHERE id = $1', [id]);
    return result.rows[0]; // Devuelve una sola sesión
  },

  // actualizar una sesión
  actualizar: async (id, data) => {
    const { usuario_id, entrenador_id, fecha, duracion } = data;
    const result = await pool.query(
      'UPDATE sesiones SET usuario_id = $1, entrenador_id = $2, fecha = $3, duracion = $4 WHERE id = $5 RETURNING *',
      [usuario_id, entrenador_id, fecha, duracion, id]
    );
    return result.rows[0]; // Devuelve la sesión actualizada
  },

  // eliminar una sesión
  eliminar: async (id) => {
    const result = await pool.query('DELETE FROM sesiones WHERE id = $1 RETURNING *', [id]);
    return result.rows[0]; // Devuelve la sesión eliminada
  }
};

export default SesionModel;
