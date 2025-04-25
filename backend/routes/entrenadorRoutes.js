const express = require('express');
const router = express.Router();
const EntrenadorController = require('../controllers/entrenadorController');

router.get('/', EntrenadorController.listar);
router.post('/', EntrenadorController.crear);
router.get('/:id', EntrenadorController.obtener);
router.delete('/:id', EntrenadorController.eliminar);

module.exports = router;
