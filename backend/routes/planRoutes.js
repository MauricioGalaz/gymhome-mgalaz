const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

router.get('/', planController.obtenerPlanes);
router.post('/', planController.crearPlan);
router.get('/:id', planController.obtenerPlanPorId);
router.put('/:id', planController.actualizarPlan);
router.delete('/:id', planController.eliminarPlan);

module.exports = router;
