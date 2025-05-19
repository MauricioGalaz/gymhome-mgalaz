import express from 'express';
import pagoController from '../controllers/pagoController.js';

const router = express.Router();

router.get('/', pagoController.obtenerPagos); // Obtener todos los pagos
router.get('/usuarios/:id_usuarios', pagoController.listarPorUsuario); // Pagos por usuario
router.post('/', pagoController.registrar); // Registrar pago
router.put('/estado/:id_pagos', pagoController.actualizarEstado); // Actualizar estado

export default router;
