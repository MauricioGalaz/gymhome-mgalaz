import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

// Importación de rutas
import authRoutes from './routes/authRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import planRoutes from './routes/planRoutes.js';
import pagoRoutes from './routes/pagoRoutes.js';
import sesionesRoutes from './routes/sesionRoutes.js';  
import progresoRoutes from './routes/progresoRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import recomendacionRoutes from './routes/recomendacionRoutes.js';
import ejercicioRoutes from './routes/ejercicioRoutes.js';
import entrenadorRoutes from './routes/entrenadorRoutes.js';


// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/planes', planRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/sesiones', sesionesRoutes);  
app.use('/api/progresos', progresoRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/recomendaciones', recomendacionRoutes);
app.use('/api/ejercicios', ejercicioRoutes);
app.use('/api/entrenadores', entrenadorRoutes);
app.use('/uploads', express.static('uploads'));


// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    mensaje: err.message || 'Error interno del servidor',
    detalles: err.details || null
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor backend escuchando en el puerto ${PORT}`);
});
