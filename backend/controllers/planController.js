// controllers/planController.js
import pool from '../config/db.js';
import planModel from '../models/planModel.js';

const planController = {
  // Listar todos los planes
  listarPlanes: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM planes');
      res.json(result.rows);
    } catch (err) {
      console.error('Error al listar planes:', err);
      res.status(500).json({ mensaje: 'Error al listar planes' });
    }
  },

  // Obtener un plan por ID
  obtenerPlan: async (req, res) => {
    const { id } = req.params;
    try {
      const plan = await planModel.obtenerPorId(id);
      if (!plan) {
        return res.status(404).json({ mensaje: 'Plan no encontrado' });
      }
      res.json(plan);
    } catch (err) {
      console.error('Error al obtener el plan:', err);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  // Crear un nuevo plan
  crearPlan: async (req, res) => {
    const { nombre, descripcion, dificultad, precio, duracion } = req.body;
    if (!nombre || !descripcion || !dificultad || precio == null || duracion == null) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    try {
      const result = await pool.query(
        'INSERT INTO planes (nombre, descripcion, dificultad, precio, duracion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nombre, descripcion, dificultad, precio, duracion]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error al crear plan:', err);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  // Editar un plan existente
  editarPlan: async (req, res) => {
    const { id } = req.params; // CORREGIDO
    const { nombre, descripcion, dificultad, precio, duracion } = req.body;

    if (!nombre || !descripcion || !dificultad || precio == null || duracion == null) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios para actualizar' });
    }

    try {
      const result = await pool.query(
        'UPDATE planes SET nombre=$1, descripcion=$2, dificultad=$3, precio=$4, duracion=$5 WHERE id_planes=$6 RETURNING *',
        [nombre, descripcion, dificultad, precio, duracion, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensaje: 'Plan no encontrado' });
      }

      res.json({ mensaje: 'Plan actualizado correctamente', plan: result.rows[0] });
    } catch (err) {
      console.error('Error al actualizar plan:', err);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  // Eliminar un plan
  eliminarPlan: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query('DELETE FROM planes WHERE id_planes = $1 RETURNING *', [id]);

      if (result.rowCount === 0) {
        return res.status(404).json({ mensaje: 'Plan no encontrado' });
      }

      res.status(200).json({ mensaje: 'Plan eliminado correctamente' });
    } catch (err) {
      console.error('Error al eliminar plan:', err);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
};

export default planController;
