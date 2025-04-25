require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); 
const app = express();
const PORT = process.env.PORT || 3001;

// Verificacion de la conexión con la base de datos PostgreSQL
pool.connect()
  .then(() => console.log('✅ Conectado a PostgreSQL gymhomedb'))
  .catch((err) => console.error('❌ Error al conectar con PostgreSQL:', err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const entrenadorRoutes = require('./routes/entrenadorRoutes');
const planRoutes = require('./routes/planRoutes');
const ejercicioRoutes = require('./routes/ejercicioRoutes');
const progresoRoutes = require('./routes/progresoRoutes');
const sesionRoutes = require('./routes/sesionRoutes');
const pagoRoutes = require('./routes/pagoRoutes');

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/entrenadores', entrenadorRoutes);
app.use('/api/planesentrenamiento', planRoutes);
app.use('/api/ejercicios', ejercicioRoutes);
app.use('/api/progresousuario', progresoRoutes);
app.use('/api/sesiones', sesionRoutes);
app.use('/api/pagos', pagoRoutes);

app.get('/', (req, res) => {
  res.send('✅ GymHomeLimache API funcionando');
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
