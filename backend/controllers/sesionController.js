import SesionModel from '../models/sesionModel.js';

const SesionController = {
  // obtener sesiones por usuario
  listarPorUsuario: async (req, res) => {
    try {
      const sesiones = await SesionModel.obtenerPorUsuario(req.params.usuario_id);
      res.json(sesiones); // Devolver sesiones encontradas
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener sesiones' });
    }
  },

  // crear una nueva sesión
  crear: async (req, res) => {
    try {
      const nuevaSesion = await SesionModel.crear(req.body);
      res.status(201).json(nuevaSesion); // Devolver la sesión creada
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear sesión' });
    }
  },

  // obtener una sesión por ID
  obtenerPorId: async (req, res) => {
    try {
      const sesion = await SesionModel.obtenerPorId(req.params.id);
      if (sesion) {
        res.json(sesion); // Devolver sesión encontrada
      } else {
        res.status(404).json({ mensaje: 'Sesión no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener sesión' });
    }
  },

  // actualizar una sesión
  actualizar: async (req, res) => {
    try {
      const sesionActualizada = await SesionModel.actualizar(req.params.id, req.body);
      if (sesionActualizada) {
        res.json(sesionActualizada); // Devolver la sesión actualizada
      } else {
        res.status(404).json({ mensaje: 'Sesión no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar sesión' });
    }
  },

  // eliminar una sesión
  eliminar: async (req, res) => {
    try {
      const sesionEliminada = await SesionModel.eliminar(req.params.id);
      if (sesionEliminada) {
        res.json({ mensaje: 'Sesión eliminada correctamente', sesion: sesionEliminada });
      } else {
        res.status(404).json({ mensaje: 'Sesión no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar sesión' });
    }
  }
};

export default SesionController;
