import express from 'express';
import { login, refreshToken } from '../controllers/authController.js';
import { verificarToken } from '../middleware/verificarToken.js';

const router = express.Router();

// Ruta para hacer login y obtener el token
router.post('/login', login);

// Ruta para renovar el token
router.post('/refresh-token', verificarToken, refreshToken);

export default router;
