const EjercicioModel = require('../models/ejercicioModel');

const EjercicioController = {
  listar: async (req, res) => {
    try {
      const ejercicios = await EjercicioModel.obtenerTodos();
      res.json(ejercicios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener ejercicios' });
    }
  },

  crear: async (req, res) => {
    try {
      const nuevo = await EjercicioModel.crear(req.body);
      res.status(201).json(nuevo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear ejercicio' });
    }
  }
};

module.exports = EjercicioController;
