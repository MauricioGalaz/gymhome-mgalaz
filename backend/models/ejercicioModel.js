import pool from '../config/db.js'; 

const EjercicioModel = {
  obtenerTodos: async () => {
    const result = await pool.query('SELECT * FROM ejercicios');
    return result.rows;
  },

  crear: async (ejercicio) => {
    const { nombre, descripcion } = ejercicio;
    const result = await pool.query(
      'INSERT INTO ejercicios (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [nombre, descripcion]
    );
    return result.rows[0];
  }
};

export default EjercicioModel; 
