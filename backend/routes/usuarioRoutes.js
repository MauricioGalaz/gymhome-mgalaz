const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const verificarToken = require('../middleware/verificarToken');
const verificarRol = require('../middleware/verificarRol');

// Rutas públicas
router.post('/signup', UsuarioController.crearUsuario);   // para registrarse
router.post('/login', UsuarioController.login);           // para logearse

// Rutas protegidas (usando token JWT)
router.get('/', verificarToken, verificarRol('admin'), UsuarioController.listarUsuarios); 
module.exports = router;
