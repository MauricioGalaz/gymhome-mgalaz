const express = require('express');
const router = express.Router();
const EjercicioController = require('../controllers/ejercicioController');

router.get('/', EjercicioController.listar);
router.post('/', EjercicioController.crear);

module.exports = router;
