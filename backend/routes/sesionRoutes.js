import express from 'express';
import pool from '../config/db.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT 
        s.id_sesiones,
        s.fecha,
        s.duracion,
        u.nombre AS nombre_usuario,
        e.nombre AS nombre_entrenador
      FROM sesiones s
      JOIN usuarios u ON s.id_usuarios = u.id_usuarios
      JOIN entrenadores e ON s.id_entrenadores = e.id_entrenadores
      ORDER BY s.id_sesiones DESC;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las sesiones.' });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT 
        s.id_sesiones,
        s.fecha,
        s.duracion,
        u.nombre AS nombre_usuario,
        e.nombre AS nombre_entrenador
      FROM sesiones s
      JOIN usuarios u ON s.id_usuarios = u.id_usuarios
      JOIN entrenadores e ON s.id_entrenadores = e.id_entrenadores
      WHERE s.id_sesiones = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Sesión no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
});


router.post('/', async (req, res) => {
  const { id_usuarios, id_entrenadores, fecha, duracion } = req.body;
  try {
    await pool.query(
      `INSERT INTO sesiones (id_usuarios, id_entrenadores, fecha, duracion)
       VALUES ($1, $2, $3, $4)`,
      [id_usuarios, id_entrenadores, fecha, duracion]
    );
    res.status(201).send('Sesión creada');
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { id_usuarios, id_entrenadores, fecha, duracion } = req.body;
  try {
    await pool.query(
      `UPDATE sesiones
       SET id_usuarios = $1, id_entrenadores = $2, fecha = $3, duracion = $4
       WHERE id_sesiones = $5`,
      [id_usuarios, id_entrenadores, fecha, duracion, id]
    );
    res.send('Sesión actualizada');
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM sesiones WHERE id_sesiones = $1', [id]);
    res.send('Sesión eliminada');
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
});

export default router;
