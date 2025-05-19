import pool from '../config/db.js';
import bcrypt from 'bcrypt';

const usuarioModel = {
  crearUsuario: async ({ email, contrasena, nombre, rol, id_plan }) => {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const query = `
      INSERT INTO usuarios (nombre, email, contrasena, rol, id_plan)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const values = [nombre, email, hashedPassword, rol, id_plan];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  obtenerPorId: async (id) => {
    const query = 'SELECT * FROM usuarios WHERE id_usuarios = $1';
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) throw new Error('Usuario no encontrado');
    return rows[0];
  },

  obtenerPorEmail: async (email) => {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    if (rows.length === 0) throw new Error('Usuario no encontrado');
    return rows[0];
  },

  obtenerTodos: async () => {
    const res = await pool.query('SELECT * FROM usuarios');
    return res.rows;
  },

  listarUsuarios: async () => {
    const query = 'SELECT * FROM usuarios ORDER BY id_usuarios ASC';
    const { rows } = await pool.query(query);
    return rows;
  },

  filtrarPorRol: async (rol) => {
    const query = 'SELECT * FROM usuarios WHERE rol = $1';
    const { rows } = await pool.query(query, [rol]);
    return rows;
  },

  actualizar: async (id, { nombre, email, contrasena, rol, id_plan }) => {
    let query = 'UPDATE usuarios SET email = $1, nombre = $2, rol = $3, id_plan = $4';
    const values = [email, nombre, rol, id_plan];

    if (contrasena) {
      const hashedPassword = await bcrypt.hash(contrasena, 10);
      query += ', contrasena = $5 WHERE id_usuarios = $6 RETURNING *';
      values.push(hashedPassword, id);
    } else {
      query += ' WHERE id_usuarios = $5 RETURNING *';
      values.push(id);
    }

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  eliminar: async (id) => {
    const query = 'DELETE FROM usuarios WHERE id_usuarios = $1';
    await pool.query(query, [id]);
  }
};

export default usuarioModel;
