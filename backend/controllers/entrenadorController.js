import EntrenadorModel from '../models/entrenadorModel.js';

const EntrenadorController = {
  // Listar todos los entrenadores
  listar: async (req, res) => {
    try {
      const entrenadores = await EntrenadorModel.obtenerTodos();
      res.json(entrenadores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener entrenadores' });
    }
  },

  // Crear un nuevo entrenador
  crear: async (req, res) => {
    try {
      const nuevo = await EntrenadorModel.crear(req.body);
      res.status(201).json(nuevo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear entrenador' });
    }
  },

  // Obtener un entrenador por ID
  obtener: async (req, res) => {
    try {
      const entrenador = await EntrenadorModel.obtenerPorId(req.params.id);
      if (!entrenador) {
        return res.status(404).json({ mensaje: 'Entrenador no encontrado' });
      }
      res.json(entrenador);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al buscar entrenador' });
    }
  },

  // Eliminar un entrenador
  eliminar: async (req, res) => {
    try {
      await EntrenadorModel.eliminar(req.params.id);
      res.json({ mensaje: 'Entrenador eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar entrenador' });
    }
  }
};

export default EntrenadorController;
