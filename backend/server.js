import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import planRoutes from './routes/planRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';  // Importar las rutas de usuarios
import pagosRoutes from './routes/pagosRoutes.js';
import sesionesRoutes from './routes/sesionesRoutes.js';
import progresoRoutes from './routes/progresoRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/planes', planRoutes);
app.use('/api/usuarios', usuariosRoutes);  // Usar las rutas de usuarios
app.use('/api/pagos', pagosRoutes);
app.use('/api/sesiones', sesionesRoutes);
app.use('/api/progresos', progresoRoutes);

// Puerto de escucha BD
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
