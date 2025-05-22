import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gymhomedb',
  password: 'Mito011078',
  port: 5432
});

const listarProgresoPorUsuario = async (usuarioId) => {
  const result = await pool.query(
    'SELECT id_progreso, id_usuarios, id_planes, avance, fecha FROM progresousuario WHERE id_usuarios = $1', 
    [usuarioId]
  );
  return result.rows;
};

const registrarProgreso = async (progreso) => {
  const { id_usuarios, id_planes, avance, fecha } = progreso;
  const result = await pool.query(
    'INSERT INTO progresousuario (id_usuarios, id_planes, avance, fecha) VALUES ($1, $2, $3, $4) RETURNING *',
    [id_usuarios, id_planes, avance, fecha]
  );
  return result.rows[0];
};

const obtenerProgresoPorId = async (id) => {
  const result = await pool.query(
    'SELECT id_progreso, id_usuarios, id_planes, avance, fecha FROM progresousuario WHERE id_progreso = $1',
    [id]
  );
  return result.rows[0];
};

export default { 
  listarProgresoPorUsuario, 
  registrarProgreso, 
  obtenerProgresoPorId 
};
