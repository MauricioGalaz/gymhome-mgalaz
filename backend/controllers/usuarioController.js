import usuarioModel from '../models/usuarioModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default {
  
  crearUsuario: async (req, res) => {
    try {
      const { email, contrasena, nombre, rol, id_plan } = req.body;

      if (!email || !contrasena || !nombre || !rol) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
      }

      const hashedPassword = await bcrypt.hash(contrasena, 10);
      const nuevoUsuario = {
        email,
        contrasena: hashedPassword,
        nombre,
        rol,
        id_plan
      };

      const usuario = await usuarioModel.crearUsuario(nuevoUsuario);
      res.status(201).json(usuario);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
  },

  
  login: async (req, res) => {
    const { email, contrasena } = req.body;

    console.log('Datos recibidos en login:', req.body); 

    if (!email || !contrasena) {
      return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
    }

    try {
      const usuario = await usuarioModel.obtenerPorEmail(email);

      if (!usuario || !usuario.contrasena) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

      const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);
      if (!passwordValida) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

      const token = jwt.sign(
        { id: usuario.id_usuarios, rol: usuario.rol },
        process.env.JWT_SECRET || 'secreto',
        { expiresIn: '1d' }
      );

      res.json({
        mensaje: 'Login exitoso',
        token,
        usuario: {
          id: usuario.id_usuarios,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol
        }
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
  },

 
  listarUsuarios: async (req, res) => {
    try {
      const usuarios = await usuarioModel.listarUsuarios();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const usuario = await usuarioModel.obtenerPorId(req.params.id);
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener usuario' });
    }
  },

  obtenerPorEmail: async (req, res) => {
    try {
      const usuario = await usuarioModel.obtenerPorEmail(req.params.email);
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener usuario' });
    }
  },
  obtenerUsuarios: async (req, res) => {
  try {
    const result = await pool.query('SELECT id_usuarios, nombre FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
},
listarNombres: async (req, res) => {
  try {
    const result = await pool.query('SELECT id_usuarios, nombre FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al listar usuarios:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
},
  subirFoto: async (req, res) => {
    const { id } = req.params;
    const foto = req.file.filename;

    await pool.query('UPDATE usuarios SET foto = $1 WHERE id_usuarios = $2', [foto, id]);

    res.json({ mensaje: 'Imagen actualizada correctamente', foto });
  },


  filtrarPorRol: async (req, res) => {
    try {
      const usuarios = await usuarioModel.filtrarPorRol(req.params.rol);
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al filtrar usuarios' });
    }
  },

  actualizar: async (req, res) => {
    try {
      const usuarioActualizado = await usuarioModel.actualizar(req.params.id, req.body);
      res.json({ mensaje: 'Usuario actualizado', usuario: usuarioActualizado });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar usuario' });
    }
  },

  eliminar: async (req, res) => {
    try {
      await usuarioModel.eliminar(req.params.id);
      res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    }
  }
 }
