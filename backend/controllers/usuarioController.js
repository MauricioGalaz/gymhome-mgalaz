const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuarioModel');

const UsuarioController = {
  // Obtener todos los usuarios
  listarUsuarios: async (req, res) => {
    try {
      const usuarios = await UsuarioModel.obtenerTodos();
      res.json(usuarios);
    } catch (error) {
      console.error('Error en listarUsuarios:', error);
      res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
  },

  // Crear un nuevo usuario
  crearUsuario: async (req, res) => {
    try {
      const { email, contrasena, nombre, rol } = req.body;

      if (!email || !contrasena || !nombre || !rol) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
      }

      const usuarioExistente = await UsuarioModel.obtenerPorEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ mensaje: 'El correo ya está registrado' });
      }

      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const nuevoUsuario = await UsuarioModel.crear({
        nombre,
        email,
        contrasena: hashedPassword,
        rol
      });

      res.status(201).json({
        mensaje: 'Usuario creado con éxito',
        usuario: nuevoUsuario
      });
    } catch (error) {
      console.error('Error en crearUsuario:', error);
      res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
  },

  // Login de usuario
  login: async (req, res) => {
    const { email, contrasena } = req.body;
    try {
      const usuario = await UsuarioModel.obtenerPorEmail(email);
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      // LOG: Ver contraseñas para depuración
      console.log('🔑 Contraseña ingresada:', contrasena);
      console.log('🧂 Hash guardado en la BD:', usuario.contrasena);

      const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

      console.log('✅ ¿Contraseña válida?', contrasenaValida);

      if (!contrasenaValida) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        token,
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
  }
};

module.exports = UsuarioController;
