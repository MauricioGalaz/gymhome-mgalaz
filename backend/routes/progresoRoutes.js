import express from 'express';
import progresoController from '../controllers/progresoController.js';
import { verificarToken } from '../middleware/verificarToken.js';



const router = express.Router();

// Crear nuevo progreso (requiere token)
router.post('/progreso', verificarToken, progresoController.crearProgreso);

// Obtener progreso del usuario autenticado
router.get('/', verificarToken, progresoController.obtenerProgresoDelToken);

// Obtener progreso por ID de usuario específico (requiere token)
router.get('/usuario/:id_usuarios', verificarToken, progresoController.listarProgresosPorUsuario);

// Obtener progreso por ID de progreso específico
router.get('/:id', verificarToken, progresoController.obtenerProgresoPorId);

export default router;
