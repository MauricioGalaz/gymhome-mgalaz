import express from 'express'
import planController from '../controllers/planController.js'
import { verificarToken } from '../middleware/verificarToken.js';
import { verificarRol } from '../middleware/verificarRol.js';


const router = express.Router()

router.get('/', planController.listarPlanes)

router.get('/:id', planController.obtenerPlan)

// Crear plan (solo admin o entrenador)
router.post(
  '/',
  verificarToken,
  
  router.get('/algo', verificarToken, verificarRol ),

  planController.crearPlan
)

// Editar plan (solo admin o entrenador)
router.put(
  '/:id',
  verificarToken,
  verificarRol(['admin', 'entrenador']),
  planController.editarPlan
)

// Eliminar plan (solo admin o entrenador)
router.delete(
  '/:id',
  verificarToken,
  verificarRol(['admin', 'entrenador']),
  planController.eliminarPlan
)

export default router
