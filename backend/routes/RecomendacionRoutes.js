const express = require('express');
const { obtenerRecomendaciones } = require('../controllers/RecomendacionController.js');

const router = express.Router();

// Ruta para obtener recomendaciones del usuario
router.get('/recomendaciones/:id', obtenerRecomendaciones);

module.exports = router;
