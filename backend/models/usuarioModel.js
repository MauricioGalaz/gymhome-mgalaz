const pool = require('../config/db');

const UsuarioModel = {
  // Obtener todos los usuarios
  obtenerTodos: async () => {
    try {
      const res = await pool.query('SELECT * FROM usuarios');
      return res.rows;
    } catch (error) {
      console.error('Error en obtenerTodos:', error.message);
      throw new Error('Error al obtener los usuarios');
    }
  },

  // Crear un nuevo usuario (la contraseña ya viene encriptada desde el controller)
  crear: async (usuario) => {
    const { nombre, email, contrasena, rol } = usuario;

    try {
      if (!email || !contrasena || !nombre || !rol) {
        throw new Error('Todos los campos son obligatorios');
      }

      const res = await pool.query(
        'INSERT INTO usuarios (nombre, email, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, email, contrasena, rol]
      );

      return res.rows[0];
    } catch (error) {
      console.error('Error al crear usuario en la base de datos:', error.message);
      throw new Error('Error al crear usuario');
    }
  },

  // Obtener un usuario por su email
  obtenerPorEmail: async (email) => {
    try {
      const res = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
      return res.rows[0];
    } catch (error) {
      console.error('Error en obtenerPorEmail:', error.message);
      throw new Error('Error al obtener el usuario por email');
    }
  }
};

module.exports = UsuarioModel;
