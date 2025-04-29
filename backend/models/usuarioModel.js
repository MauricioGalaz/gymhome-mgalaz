import pool from '../config/db.js';
import bcrypt from 'bcrypt';

// Obtener un usuario por ID
const obtenerPorId = async (id) => {
  try {
    const resultado = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (resultado.rows.length === 0) {
      throw new Error('Usuario no encontrado');
    }
    return resultado.rows[0];
  } catch (error) {
    console.error('Error al obtener el usuario por ID:');
    throw new Error('Error al obtener el usuario por ID');
  }
};

// Obtener un usuario por email
const obtenerPorEmail = async (email) => {
  try {
    const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (resultado.rows.length === 0) {
      throw new Error('Usuario no encontrado');
    }
    return resultado.rows[0];
  } catch (error) {
    console.error('Error al obtener el usuario por email:');
    throw new Error('Error al obtener el usuario por email');
  }
};

// Crear un nuevo usuario con contraseña encriptada
const crear = async (usuario) => {
  try {
    const { nombre, email, contrasena, rol } = usuario;

    if (!nombre || !email || !contrasena || !rol) {
      throw new Error('Faltan datos requeridos para crear el usuario');
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

    // Insertar el usuario en la base de datos
    const resultado = await pool.query(
      'INSERT INTO usuarios (nombre, email, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, contrasenaEncriptada, rol]
    );
    return resultado.rows[0];
  } catch (error) {
    console.error('Error al crear el usuario:');
    throw new Error('Error al crear el usuario');
  }
};

export default {
  obtenerPorId,
  obtenerPorEmail,
  crear
};
