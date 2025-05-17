import pool from '../config/db.js'; 

const sesionModel = {
  obtenerPorUsuario: async (id_usuario) => {
    const query = 'SELECT * FROM sesiones WHERE id_usuarios = $1';
    const result = await pool.query(query, [id_usuario]);
    return result.rows;
  },

  crear: async ({ fecha, duracion, id_usuarios, id_entrenadores }) => {
    const query = `
      INSERT INTO sesiones (fecha, duracion, id_usuarios, id_entrenadores)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await pool.query(query, [fecha, duracion, id_usuarios, id_entrenadores]);
    return result.rows[0];
  },

  obtenerPorId: async (id) => {
    const query = 'SELECT * FROM sesiones WHERE id_sesiones = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  actualizar: async (id, { fecha, duracion, id_usuarios, id_entrenadores }) => {
    const query = `
      UPDATE sesiones
      SET fecha = $1,
          duracion = $2,
          id_usuarios = $3,
          id_entrenadores = $4
      WHERE id_sesiones = $5
      RETURNING *;
    `;
    const result = await pool.query(query, [fecha, duracion, id_usuarios, id_entrenadores, id]);
    return result.rows[0];
  },

  eliminar: async (id) => {
    const query = 'DELETE FROM sesiones WHERE id_sesiones = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};

export default sesionModel;
