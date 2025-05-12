import express from 'express';
import progresoController from '../controllers/progresoController.js';
import { verificarToken } from '../middleware/verificarToken.js';

const router = express.Router();



router.post('/progreso', verificarToken, progresoController.crearProgreso);
router.get('/progreso/:id_usuario', verificarToken, progresoController.listarProgresosPorUsuario);
router.get('/:id',verificarToken, progresoController.obtenerProgresoPorId); 

export default router;
