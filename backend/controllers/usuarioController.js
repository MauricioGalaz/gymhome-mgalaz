import usuarioModel from '../models/usuarioModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import pool from '../config/db.js'
import multer from 'multer'

// Configuración Multer para subir foto
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Solo se permiten imágenes'), false)
    }
    cb(null, true)
  }
})

export const subirFotoMiddleware = upload.single('imagen')

export default {
  crearUsuario: async (req, res) => {
    try {
      const { email, contrasena, nombre, rol, id_plan } = req.body
      if (!email || !contrasena || !nombre || !rol) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios' })
      }

      const usuarioExistente = await usuarioModel.obtenerPorEmail(email)
      if (usuarioExistente) {
        return res.status(409).json({ mensaje: 'El correo ya está registrado' })
      }

      const hashedPassword = await bcrypt.hash(contrasena, 10)
      const usuario = await usuarioModel.crearUsuario({
        email,
        contrasena: hashedPassword,
        nombre,
        rol,
        id_plan
      })

      res.status(201).json(usuario)
    } catch (error) {
      console.error('Error al crear usuario:', error)
      res.status(500).json({ mensaje: 'Error al crear usuario' })
    }
  },

  login: async (req, res) => {
    const { email, contrasena } = req.body
    if (!email || !contrasena) {
      return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' })
    }

    try {
      const usuario = await usuarioModel.obtenerPorEmail(email)
      if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' })
      }

      const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena)
      if (!passwordValida) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' })
      }

      const token = jwt.sign(
        { id: usuario.id_usuarios, rol: usuario.rol },
        process.env.JWT_SECRET || 'secreto',
        { expiresIn: '21d' }
      )

      res.json({
        mensaje: 'Login exitoso',
        token,
        usuario: {
          id: usuario.id_usuarios,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol
        }
      })
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      res.status(500).json({ mensaje: 'Error al iniciar sesión' })
    }
  },

  obtenerPerfil: async (req, res) => {
    try {
      const usuarioId = req.usuario.id
      const usuario = await usuarioModel.obtenerPorId(usuarioId)
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' })
      }
      delete usuario.contrasena
      res.json(usuario)
    } catch (error) {
      console.error('Error al obtener perfil:', error)
      res.status(500).json({ mensaje: 'Error al obtener perfil' })
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const usuario = await usuarioModel.obtenerPorId(req.params.id)
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' })
      }
      delete usuario.contrasena
      res.json(usuario)
    } catch (error) {
      console.error('Error al obtener usuario:', error)
      res.status(500).json({ mensaje: 'Error al obtener usuario' })
    }
  },

  obtenerUsuarios: async (req, res) => {
    try {
      const usuarios = await usuarioModel.obtenerTodos()
      const usuariosSinPasswords = usuarios.map(u => {
        delete u.contrasena
        return u
      })
      res.json(usuariosSinPasswords)
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
      res.status(500).json({ mensaje: 'Error al obtener usuarios' })
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

  filtrarPorRol: async (req, res) => {
    try {
      const rol = req.params.rol
      const usuarios = await usuarioModel.obtenerPorRol(rol)
      const usuariosSinPasswords = usuarios.map(u => {
        delete u.contrasena
        return u
      })
      res.json(usuariosSinPasswords)
    } catch (error) {
      console.error('Error al filtrar usuarios por rol:', error)
      res.status(500).json({ mensaje: 'Error al filtrar usuarios por rol' })
    }
  },

  actualizar: async (req, res) => {
    try {
      if (req.body.contrasena) {
        req.body.contrasena = await bcrypt.hash(req.body.contrasena, 10)
      }
      const usuarioActualizado = await usuarioModel.actualizar(req.params.id, req.body)
      if (!usuarioActualizado) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' })
      }
      delete usuarioActualizado.contrasena
      res.json({ mensaje: 'Usuario actualizado', usuario: usuarioActualizado })
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
      res.status(500).json({ mensaje: 'Error al actualizar usuario' })
    }
  },

  eliminar: async (req, res) => {
    try {
      const eliminado = await usuarioModel.eliminar(req.params.id)
      if (!eliminado) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' })
      }
      res.json({ mensaje: 'Usuario eliminado' })
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
      res.status(500).json({ mensaje: 'Error al eliminar usuario' })
    }
  },

  subirFoto: async (req, res) => {
    const id = req.params.id
    if (!req.file) {
      return res.status(400).json({ mensaje: 'No se subió ninguna imagen' })
    }
    // Guardar ruta relativa para frontend o acceso
    const imagenPath = `/uploads/${req.file.filename}`

    try {
      const result = await pool.query(
        'UPDATE usuarios SET imagen_perfil = $1 WHERE id_usuarios = $2 RETURNING *',
        [imagenPath, id]
      )

      if (result.rowCount === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' })
      }

      const usuarioActualizado = result.rows[0]
      delete usuarioActualizado.contrasena
      res.json({ mensaje: 'Imagen subida correctamente', usuario: usuarioActualizado })
    } catch (err) {
      console.error(err)
      res.status(500).json({ mensaje: 'Error al subir la imagen' })
    }
  },

  listarNombres: async (req, res) => {
    try {
      const resultados = await pool.query('SELECT nombre FROM usuarios')
      res.json(resultados.rows)
    } catch (error) {
      console.error('Error al listar nombres:', error)
      res.status(500).json({ mensaje: 'Error al listar nombres' })
    }
  },
  
}
