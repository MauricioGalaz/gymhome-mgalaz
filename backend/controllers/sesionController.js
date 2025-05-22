import sesionModel from '../models/sesionModel.js';

const sesionController = {
  listarTodas: async (req, res) => {
    try {
      const sesiones = await sesionModel.obtenerTodas();
      res.json(sesiones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener sesiones' });
    }
  },

  listarPorUsuario: async (req, res) => {
    const { id_usuarios } = req.params;
    try {
      const sesiones = await sesionModel.obtenerPorUsuario(id_usuarios);
      res.json(sesiones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener sesiones' });
    }
  },

  crear: async (req, res) => {
    try {
      const nuevaSesion = await sesionModel.crear(req.body);
      res.status(201).json(nuevaSesion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear sesión' });
    }
  },

  obtenerPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const sesion = await sesionModel.obtenerPorId(id);
      if (sesion) {
        res.json(sesion);
      } else {
        res.status(404).json({ mensaje: 'Sesión no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener sesión' });
    }
  },

  actualizar: async (req, res) => {
    const { id } = req.params;
    try {
      const sesionActualizada = await sesionModel.actualizar(id, req.body);
      if (sesionActualizada) {
        res.json(sesionActualizada);
      } else {
        res.status(404).json({ mensaje: 'Sesión no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar sesión' });
    }
  },

  eliminar: async (req, res) => {
    const { id } = req.params;
    try {
      const sesionEliminada = await sesionModel.eliminar(id);
      if (sesionEliminada) {
        res.json({ mensaje: 'Sesión eliminada correctamente' });
      } else {
        res.status(404).json({ mensaje: 'Sesión no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar sesión' });
    }
  }
};

export default sesionController;
