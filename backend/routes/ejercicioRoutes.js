import express from 'express';
import EjercicioController from '../controllers/ejercicioController.js'; 

const router = express.Router();

// rutas de los ejercicio
router.get('/', EjercicioController.obtenerEjercicios);        
router.get('/:id', EjercicioController.obtenerEjercicioPorId); 
router.post('/', EjercicioController.crearEjercicio);         
router.put('/:id', EjercicioController.actualizarEjercicio);  
router.delete('/:id', EjercicioController.eliminarEjercicio); 

export default router;
