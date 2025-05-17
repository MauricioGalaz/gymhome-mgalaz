import express from 'express';
import pagoController from '../controllers/pagoController.js';

const router = express.Router();

router.get('/', pagoController.obtenerPagos); 
router.get('/usuarios/:id_usuarios', pagoController.listarPorUsuario); 
router.post('/', pagoController.registrar); 
router.put('/estado/:id_pagos', pagoController.actualizarEstado); 

export default router;
