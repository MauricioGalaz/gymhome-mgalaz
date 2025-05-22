import pool from '../config/db.js';

const sesionModel = {
  
  
  obtenerTodas: async () => {
  const query = `
    SELECT s.*, 
           u.nombre AS nombre_usuario, 
           e.nombre AS nombre_entrenador
    FROM sesiones s
    JOIN usuarios u ON s.id_usuarios = u.id_usuarios
    JOIN entrenadores e ON s.id_entrenadores = e.id_entrenadores;
  `;
  const result = await pool.query(query);
  return result.rows;
},

obtenerPorUsuario: async (id_usuario) => {
  const query = `
    SELECT s.*, 
           u.nombre AS nombre_usuario, 
           e.nombre AS nombre_entrenador
    FROM sesiones s
    JOIN usuarios u ON s.id_usuarios = u.id_usuarios
    JOIN entrenadores e ON s.id_entrenadores = e.id_entrenadores
    WHERE s.id_usuarios = $1;
  `;
  const result = await pool.query(query, [id_usuario]);
  return result.rows;
},

obtenerPorId: async (id) => {
  const query = `
    SELECT s.*, 
           u.nombre AS nombre_usuario, 
           e.nombre AS nombre_entrenador
    FROM sesiones s
    JOIN usuarios u ON s.id_usuarios = u.id_usuarios
    JOIN entrenadores e ON s.id_entrenadores = e.id_entrenadores
    WHERE s.id_sesiones = $1;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
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
