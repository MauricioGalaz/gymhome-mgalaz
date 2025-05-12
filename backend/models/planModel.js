import pool from '../config/db.js';
// console.log('POOL:', pool); // Solo para debug

const planModel = {
  obtenerTodos: async () => {
    const res = await pool.query('SELECT * FROM planes');
    return res.rows;
  },

  crear: async (plan) => {
    const { nombre, descripcion, dificultad, duracion, precio } = plan;
    const res = await pool.query(
      'INSERT INTO planes (nombre, descripcion, dificultad, duracion, precio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, descripcion, dificultad, duracion, precio]
    );
    return res.rows[0];
  },

  obtenerPorId: async (id) => {
    const res = await pool.query('SELECT * FROM planes WHERE id_planes = $1', [id]);
    return res.rows[0];
  },

  eliminar: async (id) => {
    const res = await pool.query('DELETE FROM planes WHERE id_planes = $1 RETURNING *', [id]);
    if (res.rowCount === 0) {
      throw new Error('Plan no encontrado para eliminar');
    }
    return res.rows[0];
  },

  actualizar: async (id, datos) => {
    const { nombre, descripcion, dificultad, duracion, precio } = datos;

    if (!id || !nombre || !descripcion || !dificultad || duracion == null || precio == null) {
      throw new Error('Todos los campos son obligatorios');
    }

    const query = `
      UPDATE planes
      SET nombre = $1, descripcion = $2, dificultad = $3, duracion = $4, precio = $5
      WHERE id_planes = $6
      RETURNING *
    `;
    const values = [nombre, descripcion, dificultad, duracion, precio, id];

    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      throw new Error('Plan no encontrado para actualizar');
    }

    return rows[0];
  }
};

export default planModel;
