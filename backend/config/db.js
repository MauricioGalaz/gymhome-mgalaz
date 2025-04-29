import { Pool } from 'pg';
import dotenv from 'dotenv';

// variables de entorno desde el archivo .env
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432, // Puerto de PostgreSQL
});

export default pool;
