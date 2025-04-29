import express from 'express';
import usuarioController from '../controllers/usuarioController.js';
import { verificarToken } from '../middleware/verificarToken.js';
import { verificarRol } from '../middleware/verificarRol.js';

const router = express.Router();

//  Rutas públicas (no requieren token)
router.post('/signup', usuarioController.crearUsuario);  // Registrar nuevo usuario
router.post('/login', usuarioController.login);          // Login usuario

//  Rutas protegidas (requieren token y rol específico)
router.get('/', verificarToken, verificarRol('admin'), usuarioController.listarUsuarios); 

export default router;
