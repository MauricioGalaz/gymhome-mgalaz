import express from 'express';
import obtenerRecomendaciones from '../controllers/RecomendacionController.js';

const router = express.Router();

// Ruta para obtener recomendaciones por ID de usuario
router.get('/:id', obtenerRecomendaciones);

export default router;
