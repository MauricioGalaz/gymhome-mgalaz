const express = require('express');
const router = express.Router();
const SesionController = require('../controllers/sesionController');

router.get('/:usuario_id', SesionController.listarPorUsuario);
router.post('/', SesionController.crear);

module.exports = router;
