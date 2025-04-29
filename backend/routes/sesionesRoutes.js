import express from 'express';
import SesionController from '../controllers/sesionController.js';

const router = express.Router();

// Rutas manej0 de sesiones
router.get('/:usuario_id', SesionController.listarPorUsuario); // Listar sesiones por usuario
router.post('/', SesionController.crear); // Crear nueva sesión
router.get('/sesion/:id', SesionController.obtenerPorId); // Obtener sesión por ID
router.put('/sesion/:id', SesionController.actualizar); // Actualizar sesión por ID
router.delete('/sesion/:id', SesionController.eliminar); // Eliminar sesión por ID

export default router;
