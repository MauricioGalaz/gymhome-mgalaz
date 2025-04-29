import pool from '../config/db.js';

const PlanModel = {
  obtenerTodos: async () => {
    const res = await pool.query('SELECT * FROM planesentrenamiento');
    return res.rows;
  },

  crear: async (plan) => {
    const { nombre, descripcion, duracion, precio } = plan;
    const res = await pool.query(
      'INSERT INTO planesentrenamiento (nombre, descripcion, duracion, precio) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, descripcion, duracion, precio]
    );
    return res.rows[0];
  },

  obtenerPorId: async (id) => {
    const res = await pool.query('SELECT * FROM"planesentrenamiento"WHERE id = $1', [id]);
    return res.rows[0];
  },

  eliminar: async (id) => {
    await pool.query('DELETE FROM"planesentrenamiento"WHERE id = $1', [id]);
  },
   actualizar: async (id, datos) => {
    const { nombre, descripcion, dificultad, precio, duracion } = datos;
    const query = 'UPDATE"planesentrenamiento" SET nombre = $1, descripcion = $2, precio = $3 WHERE id = $4, data = duracion RETURNING *';
    const values = [nombre, descripcion, descripcion, precio, duracion]
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}


export default PlanModel;
