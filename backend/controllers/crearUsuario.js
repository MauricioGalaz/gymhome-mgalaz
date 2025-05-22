import bcrypt from 'bcrypt';
import db from '../config/db.js';

const crearUsuario = async () => {
  try {
    const nombre = 'Mauro';
    const correo = 'mauro@gmail.com';  // Usar 'correo' si esa es la columna correcta
    const contrasena = '12345678';
    const rol = 'usuario';

    const hash = await bcrypt.hash(contrasena, 10);

    await db.none(
      'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES ($1, $2, $3, $4)',
      [nombre, correo, hash, rol]
    );

    console.log('✅ Usuario creado exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear usuario:', error.message);
    process.exit(1);
  }
};

export default crearUsuario;
