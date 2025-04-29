import express from 'express';
import PagoController from '../controllers/pagoController.js';

const router = express.Router();
router.get('/:usuario_id', PagoController.listarPorUsuario);
router.post('/', PagoController.registrar);

export default router;
