import pool from '../config/db.js';

const EjercicioController = {
  obtenerEjercicios: async (req, res) => {
    try {
      const resultado = await pool.query('SELECT * FROM ejercicios');
      res.json(resultado.rows);
    } catch (error) {
      console.error('Error al obtener ejercicios:', error);
      res.status(500).json({ mensaje: 'Error al obtener ejercicios' });
    }
  },

  obtenerEjercicioPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await pool.query(
        'SELECT * FROM ejercicios WHERE id = $1',
        [id]
      );
      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: 'Ejercicio no encontrado' });
      }
      res.json(resultado.rows[0]);
    } catch (error) {
      console.error('Error al obtener el ejercicio:', error);
      res.status(500).json({ mensaje: 'Error al obtener el ejercicio' });
    }
  },

  crearEjercicio: async (req, res) => {
    const { nombre, descripcion, tipo, duracion } = req.body;
    try {
      const resultado = await pool.query(
        'INSERT INTO ejercicios (nombre, descripcion, tipo, duracion) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, descripcion, tipo, duracion]
      );
      res.status(201).json(resultado.rows[0]);
    } catch (error) {
      console.error('Error al crear el ejercicio:', error);
      res.status(500).json({ mensaje: 'Error al crear el ejercicio' });
    }
  },

  actualizarEjercicio: async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, tipo, duracion } = req.body;
    try {
      const resultado = await pool.query(
        'UPDATE ejercicios SET nombre = $1, descripcion = $2, tipo = $3, duracion = $4 WHERE id = $5 RETURNING *',
        [nombre, descripcion, tipo, duracion, id]
      );
      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: 'Ejercicio no encontrado' });
      }
      res.json(resultado.rows[0]);
    } catch (error) {
      console.error('Error al actualizar el ejercicio:', error);
      res.status(500).json({ mensaje: 'Error al actualizar el ejercicio' });
    }
  },

  eliminarEjercicio: async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await pool.query('DELETE FROM ejercicios WHERE id = $1 RETURNING *', [id]);
      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: 'Ejercicio no encontrado' });
      }
      res.json({ mensaje: 'Ejercicio eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar el ejercicio' });
    }
  }
};

export default EjercicioController;
