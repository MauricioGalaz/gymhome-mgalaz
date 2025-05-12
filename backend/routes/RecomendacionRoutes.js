import express from 'express';
import obtenerRecomendaciones from '../controllers/RecomendacionController.js';

const router = express.Router();

router.get('/:id', obtenerRecomendaciones);

export default router;
