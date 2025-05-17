import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const router = express.Router();


router.post('/register', async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    const usuarioExistente = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);

    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const contraseñaHash = await bcrypt.hash(contraseña, salt);

    await pool.query(
      'INSERT INTO usuarios (nombre, correo, contraseña) VALUES ($1, $2, $3)',
      [nombre, correo, contraseñaHash]
    );

    res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: { nombre, correo } });
  } catch (err) {
    console.error('Error al registrar el usuario:', err);
    res.status(500).json({ mensaje: 'Error al registrar el usuario', error: err.message });
  }
});

export default router;
