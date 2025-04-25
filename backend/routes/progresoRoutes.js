const express = require('express');
const router = express.Router();
const ProgresoController = require('../controllers/progresoController');

router.get('/:usuario_id', ProgresoController.listarPorUsuario);
router.post('/', ProgresoController.registrar);

module.exports = router;
