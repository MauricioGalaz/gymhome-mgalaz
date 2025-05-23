import express from 'express';

import EntrenadorController from '../controllers/entrenadorController.js';

const router = express.Router();



router.get('/', EntrenadorController.listar);
router.post('/', EntrenadorController.crear);
router.get('/:id', EntrenadorController.obtener);
router.put('/:id', EntrenadorController.actualizar);  
router.delete('/:id', EntrenadorController.eliminar);

export default router;
