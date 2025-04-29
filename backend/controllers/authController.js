import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Generación del token en el login
export const login = (req, res) => {
  const { email, password } = req.body;


  const usuario = { id: 1 };  

  // Generar un token con la duración de 21 días
  const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, { expiresIn: '21d' });

  res.json({ token });
};

// Renovar el token
export const refreshToken = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del header

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verificar si el token sigue siendo válido
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    // Si el token es válido, generar un nuevo token
    const newToken = jwt.sign({ id: decoded.id }, process.env.SECRET_KEY, { expiresIn: '31d' });

    res.json({ token: newToken });
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};
