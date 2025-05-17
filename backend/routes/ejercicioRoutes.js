import express from 'express';
import EjercicioController from '../controllers/ejercicioController.js'; 

const router = express.Router();


// Rutas para los ejercicios
router.get('/', EjercicioController.listarEjercicios);    
router.get('/:id', EjercicioController.obtenerEjercicioPorId);
router.post('/', EjercicioController.crearEjercicio);     
router.put('/:id', EjercicioController.actualizarEjercicio);  
router.delete('/:id', EjercicioController.eliminarEjercicio);

export default router;
