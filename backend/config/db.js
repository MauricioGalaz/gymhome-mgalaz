require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gymhomedb',
  password: 'Mito011078',
  port: 5432, // el puerto pgAdmin
});

// conectar con la base de datos
pool.connect()
  .then(() => console.log('🟢 Conexión a PostgreSQL exitosa'))
  .catch(err => console.error('🔴 Error de conexión a PostgreSQL:', err));

// Cerrar la conexión cuando la aplicación se apague
process.on('SIGINT', () => {
  pool.end(() => {
    console.log('🔴 Conexión a PostgreSQL cerrada');
    process.exit(0);
  });
});

module.exports = pool;
