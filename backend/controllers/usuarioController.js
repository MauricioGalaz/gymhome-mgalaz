import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/usuarioModel.js';

const usuarioController = {
  // Obtener todos los usuarios
  listarUsuarios: async (req, res) => {
    try {
      const usuarios = await UsuarioModel.obtenerTodos();
      res.json(usuarios);
    } catch (error) {
      console.error('Error al listar usuarios:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
  },

  // Crear un nuevo usuario
  crearUsuario: async (req, res) => {
    try {
      const { nombre, email, contrasena, rol } = req.body;

      if (!nombre || !email || !contrasena || !rol) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
      }

      // Verificar si ya existe el usuario
      let usuarioExistente = null;
      try {
        usuarioExistente = await UsuarioModel.obtenerPorEmail(email);
      } catch (error) {
        
      }

      if (usuarioExistente) {
        return res.status(400).json({ mensaje: 'El correo ya está registrado' });
      }

      // Hashear contraseña
      const hashedPassword = await bcrypt.hash(contrasena, 10);

      // Crear usuario
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
      console.error('Error en crearUsuario:', error.message);
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

      const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
      if (!contrasenaValida) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '21d' }
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
      console.error('Error en login:', error.message);
      res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
  }
};

export default usuarioController;
