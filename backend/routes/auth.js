const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario'); 
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  try {
    // Verifica si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Encripta la contraseña
    const salt = await bcrypt.genSalt(10);
    const contraseñaHash = await bcrypt.hash(contraseña, salt);

    // Crea el usuario
    const nuevoUsuario = new Usuario({ nombre, correo, contraseña: contraseñaHash });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al registrar el usuario' });
  }
});

module.exports = router;
