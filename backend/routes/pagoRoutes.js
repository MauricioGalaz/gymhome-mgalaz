const express = require('express');
const router = express.Router();
const PagoController = require('../controllers/pagoController');

router.get('/:usuario_id', PagoController.listarPorUsuario);
router.post('/', PagoController.registrar);

module.exports = router;
