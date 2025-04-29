import express from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario.js'; 
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  // Validación de entrada
  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificación si el usuario existe
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Encriptación de la contraseña
    const salt = await bcrypt.genSalt(10);
    const contraseñaHash = await bcrypt.hash(contraseña, salt);

    // Crear el usuario
    const nuevoUsuario = new Usuario({ nombre, correo, contraseña: contraseñaHash });
    await nuevoUsuario.save();

    
    res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: { nombre, correo } });
  } catch (err) {
    console.error('Error al registrar el usuario:', err);
    res.status(500).json({ mensaje: 'Error al registrar el usuario', error: err.message });
  }
});

export default router;
