import entrenadorModel from '../models/entrenadorModel.js';

const entrenadorController = {
  listar: async (req, res) => {
    try {
      const entrenadores = await entrenadorModel.listar();
      res.json(entrenadores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener entrenadores' });
    }
  },

  obtener: async (req, res) => {
    const { id } = req.params;
    try {
      const entrenador = await entrenadorModel.obtener(id);
      if (entrenador) {
        res.json(entrenador);
      } else {
        res.status(404).json({ mensaje: 'Entrenador no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener entrenador' });
    }
  },

  crear: async (req, res) => {
    const { nombre, especialidad, disponibilidad } = req.body;
    try {
      const nuevoEntrenador = await entrenadorModel.crear({ nombre, especialidad, disponibilidad });
      res.status(201).json(nuevoEntrenador);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear entrenador' });
    }
  },

  actualizar: async (req, res) => {
    const { id } = req.params;
    const { nombre, especialidad, disponibilidad } = req.body;
    try {
      const entrenadorActualizado = await entrenadorModel.actualizar(id, { nombre, especialidad, disponibilidad });
      if (entrenadorActualizado) {
        res.json(entrenadorActualizado);
      } else {
        res.status(404).json({ mensaje: 'Entrenador no encontrado' });
      }
      res.json(entrenador);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar entrenador' });
    }
  },

  // Eliminar un entrenador
  eliminar: async (req, res) => {
    const { id } = req.params;
    try {
      await EntrenadorModel.eliminar(req.params.id);
      res.json({ mensaje: 'Entrenador eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar entrenador' });
    }
  }
};

export default entrenadorController;
