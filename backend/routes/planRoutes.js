import express from 'express';
import planController from '../controllers/planController.js';
import { verificarToken } from '../middleware/verificarToken.js';
import { verificarRol } from '../middleware/verificarRol.js';

const router = express.Router();


// Listar todos los planes
router.get('/', planController.listarPlanes);

// Obtener un plan por ID
router.get('/:id', planController.obtenerPlan);

// Crear plan (solo admin o entrenador)
router.post(
  '/',
  verificarToken,
  verificarRol(['admin', 'entrenador']),
  planController.crearPlan
);

// Editar plan (solo admin o entrenador)
router.put(
  '/:id',
  verificarToken,
  verificarRol(['admin', 'entrenador']),
  planController.editarPlan
);

// Eliminar plan (solo admin o entrenador)
router.delete(
  '/:id',
  verificarToken,
  verificarRol(['admin', 'entrenador']),
  planController.eliminarPlan
);

export default router;
