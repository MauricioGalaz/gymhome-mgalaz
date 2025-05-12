import express from 'express';
import { body } from 'express-validator';
import usuarioController from '../controllers/usuarioController.js'; // Asegúrate de que esto sea correcto
import { verificarToken } from '../middleware/verificarToken.js';
import { verificarRol } from '../middleware/verificarRol.js';

const router = express.Router();

// Ruta para crear usuario
router.post(
  '/',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Debe proporcionar un email válido'),
    body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol').isIn(['admin', 'entrenador', 'usuario']).withMessage('Rol no válido'),
  ],
  usuarioController.crearUsuario // Verifica que esta función exista en el controlador
);

// Ruta para login
router.post('/login', usuarioController.login); // Verifica que "login" sea una función válida

// Ruta para obtener usuario por email
router.get('/email/:email', usuarioController.obtenerPorEmail); // Asegúrate que "obtenerPorEmail" sea una función válida

router.get('/', usuarioController.obtenerUsuarios);

// Otras rutas de usuario
router.get('/:id', usuarioController.obtenerPorId); // Verifica que la función existe
router.get('/', verificarToken, verificarRol(['admin', 'usuario']), usuarioController.listarUsuarios); // Verifica que "listarUsuarios" sea una función válida
router.put('/:id', verificarToken, verificarRol(['admin', 'entrenador']), usuarioController.actualizar);
router.delete('/:id', verificarToken, verificarRol(['admin', 'entrenador']), usuarioController.eliminar);
router.get('/nombres', usuarioController.listarNombres);

export default router;
