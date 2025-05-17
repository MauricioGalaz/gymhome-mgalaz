import bcrypt from 'bcrypt';
import db from '../config/db.js';

const crearUsuario = async () => {
  try {
    const nombre = 'Mauro';
    const email = 'mauro@gmail.com';
    const contrasena = '12345678';
    const rol = 'usuario';

    const hash = await bcrypt.hash(contrasena, 10);

    await db.none(
      'INSERT INTO usuarios (nombre, email, contrasena, rol) VALUES ($1, $2, $3, $4)',
      [nombre, email, hash, rol]
    );

    console.log('✅ Usuario creado exitosamente');
    process.exit();
  } catch (error) {
    console.error('❌ Error al crear usuario:', error.message);
    process.exit(1);
  }
};
export default crearUsuario;

