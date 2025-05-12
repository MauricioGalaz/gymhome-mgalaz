import express from 'express';
import EjercicioController from '../controllers/ejercicioController.js'; // Asegúrate de que la importación sea correcta

const router = express.Router();


// Rutas para los ejercicios
router.get('/', EjercicioController.listarEjercicios);    // Listar todos los ejercicios
router.get('/:id', EjercicioController.obtenerEjercicioPorId); // Obtener un ejercicio por su id
router.post('/', EjercicioController.crearEjercicio);     // Crear un nuevo ejercicio
router.put('/:id', EjercicioController.actualizarEjercicio);  // Actualizar un ejercicio por su id
router.delete('/:id', EjercicioController.eliminarEjercicio); // Eliminar un ejercicio por su id

export default router;
