const pool = require('../config/db');

// Obtener todos los planes
exports.obtenerPlanes = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM PlanesEntrenamiento');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener planes:', error);
    res.status(500).json({ mensaje: 'Error al obtener planes' });
  }
};

// Crear un plan
exports.crearPlan = async (req, res) => {
  try {
    const { nombre, descripcion, dificultad, precio, duracion } = req.body;
    const resultado = await pool.query(
      'INSERT INTO PlanesEntrenamiento (nombre, descripcion, dificultad, precio, duracion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, descripcion, dificultad, precio, duracion]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al crear plan:', error);
    res.status(500).json({ mensaje: 'Error al crear plan' });
  }
};

// Obtener plan por ID
exports.obtenerPlanPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('SELECT * FROM PlanesEntrenamiento WHERE id = $1', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Plan no encontrado' });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar plan' });
  }
};

// Actualizar un plan
exports.actualizarPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, dificultad, precio, duracion } = req.body;
    const resultado = await pool.query(
      'UPDATE PlanesEntrenamiento SET nombre = $1, descripcion = $2, dificultad = $3, precio = $4, duracion = $5 WHERE id = $6 RETURNING *',
      [nombre, descripcion, dificultad, precio, duracion, id]
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Plan no encontrado' });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar plan' });
  }
};

// Eliminar un plan
exports.eliminarPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('DELETE FROM PlanesEntrenamiento WHERE id = $1 RETURNING *', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Plan no encontrado' });
    }
    res.json({ mensaje: 'Plan eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar plan' });
  }
};
