import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import usuarioModel from '../models/usuarioModel.js';

dotenv.config();

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y contraseña son requeridos' });
    }

    try {
      const usuario = await usuarioModel.obtenerPorEmail(email);
      if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
      }

      const esContrasenaCorrecta = await bcrypt.compare(password, usuario.contrasena);
      if (!esContrasenaCorrecta) {
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
      }

      const token = jwt.sign(
        { id: usuario.id_usuarios, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      res.json({ mensaje: 'Login exitoso', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
  },

  refreshToken: (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(403).json({ mensaje: 'Token no proporcionado' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
