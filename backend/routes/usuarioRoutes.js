import express from 'express';
import { body } from 'express-validator';
import usuarioController from '../controllers/usuarioController.js'; 
import { verificarToken } from '../middleware/verificarToken.js';
import { verificarRol } from '../middleware/verificarRol.js';
import upload from '../middlewares/upload.js';

const router = express.Router();


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

// Ruta para login
router.post('/login', usuarioController.login); 


router.get('/email/:email', usuarioController.obtenerPorEmail); 
router.get('/todos', usuarioController.obtenerUsuarios);

// Otras rutas de usuario
router.get('/:id', usuarioController.obtenerPorId); 
router.get('/', verificarToken, verificarRol(['admin', 'usuario']), usuarioController.listarUsuarios); 
router.put('/:id', verificarToken, verificarRol(['admin', 'entrenador']), usuarioController.actualizar);
router.delete('/:id', verificarToken, verificarRol(['admin', 'entrenador']), usuarioController.eliminar);
router.get('/nombres', usuarioController.listarNombres);
router.post('/subir-foto/:id', upload.single('foto'), usuarioController.subirFoto);

export default router;
