import progresoModel from '../models/progresoModel.js';

const crearProgreso = async (req, res) => {
  try {
    const nuevoProgreso = await progresoModel.registrarProgreso(req.body);
    res.status(201).json(nuevoProgreso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el progreso' });
  }
};

const listarProgresosPorUsuario = async (req, res) => {
  const { id_usuarios } = req.params;
  try {
    const progresos = await progresoModel.listarProgresoPorUsuario(id_usuarios);
    res.json(progresos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener progresos' });
  }
};

// (Opcional) Obtener un solo progreso por ID
const obtenerProgresoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await progresoModel.obtenerProgresoPorId(id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ mensaje: 'Progreso no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el progreso' });
  }
};

export default {
  crearProgreso,
  listarProgresosPorUsuario,
  obtenerProgresoPorId
};
