// authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import usuarioModel from '../models/usuarioModel.js';

dotenv.config();

const authController = {
  // Función para iniciar sesión
  login: async (req, res) => {
    const { email, password } = req.body;


    try {
      // Buscar al usuario por correo electrónico
      const usuario = await usuarioModel.obtenerPorEmail(email);
      if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
      }

      // Comparar la contraseña proporcionada con la almacenada en la base de datos
      const esContrasenaCorrecta = await bcrypt.compare(password, usuario.contrasena);
      if (!esContrasenaCorrecta) {
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
      }

      // Generar un token JWT
      const token = jwt.sign(
        { id: usuario.id_usuarios, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      // Responder con el token
      res.json({ mensaje: 'Login exitoso', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
  },

  // Función para renovar el token
  refreshToken: (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }

    try {
      // Verificar y decodificar el token existente
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Generar un nuevo token con la misma información
      const newToken = jwt.sign(
        { id: decoded.id, rol: decoded.rol },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      res.json({ mensaje: 'Token renovado', token: newToken });
    } catch (err) {
      console.error(err);
      return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }
  }
};

export default authController;
