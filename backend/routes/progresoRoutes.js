import express from 'express';
const router = express.Router();
import * as progresoController from '../controllers/progresoController.js'; 

// Ruta para listar progreso por usuario
router.get('/:usuario_id', progresoController.listarPorUsuario);

// Ruta para registrar un nuevo progreso
router.post('/', progresoController.registrar);

export default router;
