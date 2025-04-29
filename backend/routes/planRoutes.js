import express from 'express';
import PlanController from '../controllers/planController.js';

const router = express.Router();

router.get('/', PlanController.obtenerPlanes);
router.get('/:id', PlanController.obtenerPlanPorId);
router.put('/:id', PlanController.actualizarPlan);
router.post('/', PlanController.crearPlan);
router.delete('/:id', PlanController.eliminarPlan);


export default router;
