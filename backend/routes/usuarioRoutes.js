import express from 'express';
import { body } from 'express-validator';
import usuarioController from '../controllers/usuarioController.js';
import { verificarToken } from '../middleware/verificarToken.js';
import { verificarRol } from '../middleware/verificarRol.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Crear nuevo usuario
router.post(
  '/',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Debe proporcionar un email válido'),
    body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol').isIn(['admin', 'entrenador', 'usuario']).withMessage('Rol no válido'),
  ],
  usuarioController.crearUsuario
);

// Login
router.post('/login', usuarioController.login);

// Obtener usuario por email
router.get('/email/:email', usuarioController.obtenerPorEmail);

// Listar todos los usuarios (sin protección)
router.get('/todos', usuarioController.obtenerUsuarios);

// Obtener usuario por ID
router.get('/:id', usuarioController.obtenerPorId);

// Listar usuarios (protegido por token y rol)
router.get(
  '/',
  verificarToken,
  verificarRol(['admin', 'usuario']),
  usuarioController.listarUsuarios
);

// Actualizar usuario (solo admin o entrenador)
router.put(
  '/:id',
  verificarToken,
  verificarRol(['admin', 'entrenador']),
  usuarioController.actualizar
);

// Eliminar usuario (solo admin o entrenador)
router.delete(
  '/:id',
  verificarToken,
  verificarRol(['admin', 'entrenador']),
  usuarioController.eliminar
);

// Listar solo nombres de usuarios
router.get('/nombres', usuarioController.listarNombres);

// Subir foto de perfil
router.post(
  '/subir-foto/:id',
  upload.single('foto'),
  usuarioController.subirFoto
);

export default router;
