import express from 'express';
import sesionController from '../controllers/sesionController.js';
import { verificarToken } from '../middleware/verificarToken.js';



const router = express.Router();

// Listar todas las sesiones (protección con token)
router.get('/', verificarToken, sesionController.listarTodas);

// Listar sesiones de un usuario (protección con token)
router.get('/usuario/:id_usuarios', verificarToken, sesionController.listarPorUsuario);

// Obtener sesión por ID (protección con token)
router.get('/:id', verificarToken, sesionController.obtenerPorId);

// Crear sesión (protección con token)
router.post('/', verificarToken, sesionController.crear);

// Actualizar sesión (protección con token)
router.put('/:id', verificarToken, sesionController.actualizar);

// Eliminar sesión (protección con token)
router.delete('/:id', verificarToken, sesionController.eliminar);

export default router;
