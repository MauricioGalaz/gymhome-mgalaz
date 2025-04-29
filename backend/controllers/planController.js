import pool from '../config/db.js';

const PlanController = {
  // Obtener todos los planes
  obtenerPlanes: async (req, res) => {
    try {
      const resultado = await pool.query('SELECT * FROM "planesentrenamiento"');
      res.json(resultado.rows);
    } catch (error) {
      console.error('Error al obtener planes:', error);
      res.status(500).json({ mensaje: 'Error al obtener planes' });
    }
  },

  // Obtener un plan por ID
  obtenerPlanPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await pool.query(
        'SELECT * FROM "planesentrenamiento" WHERE id = $1',
        [id]
      );
      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: 'Plan no encontrado' });
      }
      res.json(resultado.rows[0]);
    } catch (error) {
      console.error('Error al obtener el plan:', error);
      res.status(500).json({ mensaje: 'Error al obtener el plan' });
    }
  },

  // Crear un nuevo plan
  crearPlan: async (req, res) => {
    const { nombre, descripcion, dificultad, precio, duracion } = req.body;

    // Validar que todos los campos obligatorios estén presentes
    if (!nombre || !descripcion || !dificultad || precio == null || duracion == null) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
      const resultado = await pool.query(
        'INSERT INTO "planesentrenamiento" (nombre, descripcion, dificultad, precio, duracion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nombre, descripcion, dificultad, precio, duracion]
      );
      res.status(201).json(resultado.rows[0]); // Devuelve el plan recién creado
    } catch (error) {
      console.error('Error al crear el plan:', error);
      res.status(500).json({ mensaje: 'Error al crear el plan' });
    }
  },

  // Actualizar un plan
  actualizarPlan: async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, dificultad, precio, duracion } = req.body;

    // Validar que todos los campos obligatorios estén presentes
    if (!nombre || !descripcion || !dificultad || precio == null || duracion == null) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios para actualizar' });
    }

    try {
      const resultado = await pool.query(
        'UPDATE "planesentrenamiento" SET nombre = $1, descripcion = $2, dificultad = $3, precio = $4, duracion = $5 WHERE id = $6 RETURNING *',
        [nombre, descripcion, dificultad, precio, duracion, id]
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: 'Plan no encontrado' });
      }

      res.json({ mensaje: 'Plan actualizado correctamente', plan: resultado.rows[0] });
    } catch (error) {
      console.error('Error al actualizar el plan:', error);
      res.status(500).json({ mensaje: 'Error al actualizar el plan' });
    }
  },

  // Eliminar un plan
  eliminarPlan: async (req, res) => {
    const { id } = req.params;
    try {
      const resultado = await pool.query(
        'DELETE FROM "planesentrenamiento" WHERE id = $1 RETURNING *',
        [id]
      );
      if (resultado.rows.length === 0) {
        return res.status(404).json({ mensaje: 'Plan no encontrado' });
      }
      res.json({ mensaje: 'Plan eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el plan:', error);
      res.status(500).json({ mensaje: 'Error al eliminar el plan' });
    }
  }
};

export default PlanController;
