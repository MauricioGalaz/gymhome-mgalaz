import ejercicioModel from '../models/ejercicioModel.js';

const EjercicioController = {
  listarEjercicios: async (req, res) => {
    try {
      const ejercicios = await ejercicioModel.obtenerTodos();
      res.json(ejercicios);
    } catch (error) {
      console.error('Error al obtener ejercicios:', error);
      res.status(500).json({ mensaje: 'Error al obtener ejercicios' });
    }
  },

  obtenerEjercicioPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const ejercicio = await ejercicioModel.obtenerPorId(id);
      if (!ejercicio) {
        return res.status(404).json({ mensaje: 'Ejercicio no encontrado' });
      }
      res.json(ejercicio);
    } catch (error) {
      console.error('Error al obtener ejercicio:', error);
      res.status(500).json({ mensaje: 'Error al obtener el ejercicio' });
    }
  },

  crearEjercicio: async (req, res) => {
    try {
      const { nombre, descripcion, tipo, duracion } = req.body;
      const nuevoEjercicio = await ejercicioModel.crear({ nombre, descripcion, tipo, duracion });
      res.status(201).json(nuevoEjercicio);
    } catch (error) {
      console.error('Error al crear ejercicio:', error);
      res.status(500).json({ mensaje: 'Error al crear el ejercicio' });
    }
  },

  actualizarEjercicio: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, tipo, duracion } = req.body;
      const ejercicioActualizado = await ejercicioModel.actualizar(id, { nombre, descripcion, tipo, duracion });
      if (!ejercicioActualizado) {
        return res.status(404).json({ mensaje: 'Ejercicio no encontrado' });
      }
      res.json(ejercicioActualizado);
    } catch (error) {
      console.error('Error al actualizar ejercicio:', error);
      res.status(500).json({ mensaje: 'Error al actualizar el ejercicio' });
    }
  },

  eliminarEjercicio: async (req, res) => {
    try {
      const { id } = req.params;
      const ejercicioEliminado = await ejercicioModel.eliminar(id);
      if (!ejercicioEliminado) {
        return res.status(404).json({ mensaje: 'Ejercicio no encontrado' });
      }
      res.json({ mensaje: 'Ejercicio eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar ejercicio:', error);
      res.status(500).json({ mensaje: 'Error al eliminar el ejercicio' });
    }
  }
};

export default EjercicioController;
