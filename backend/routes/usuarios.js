import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import pool from '../config/db.js';
import { verificarToken } from '../middleware/verificarToken.js';


const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes JPEG o PNG'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

const manejoErroresMulter = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'El archivo es demasiado grande. Máximo 5MB.' });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

router.get('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      'SELECT id_usuarios, nombre, correo, telefono, objetivo, peso, altura, imagen_perfil FROM usuarios WHERE id_usuarios = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

router.put('/usuarios/:id', verificarToken, upload.single('imagen'), manejoErroresMulter, async (req, res) => {
  const id = req.params.id;
  const { nombre, correo, telefono, objetivo, peso, altura } = req.body;
  const nuevaImagen = req.file ? req.file.path : null;

  try {
    if (!nombre || !correo) {
      if (nuevaImagen) {
        const rutaNuevaImagen = path.resolve(nuevaImagen);
        if (fs.existsSync(rutaNuevaImagen)) fs.unlinkSync(rutaNuevaImagen);
      }
      return res.status(400).json({ error: 'Nombre y correo son obligatorios.' });
    }

    const usuarioActual = await pool.query('SELECT imagen_perfil FROM usuarios WHERE id_usuarios = $1', [id]);
    if (usuarioActual.rows.length === 0) {
      if (nuevaImagen) {
        const rutaNuevaImagen = path.resolve(nuevaImagen);
        if (fs.existsSync(rutaNuevaImagen)) fs.unlinkSync(rutaNuevaImagen);
      }
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const imagenVieja = usuarioActual.rows[0].imagen_perfil;

    if (nuevaImagen) {
      await pool.query(
        `UPDATE usuarios SET 
          nombre=$1, correo=$2, telefono=$3, objetivo=$4, peso=$5, altura=$6, imagen_perfil=$7 
         WHERE id_usuarios=$8`,
        [nombre, correo, telefono, objetivo, peso, altura, nuevaImagen, id]
      );

      if (imagenVieja && imagenVieja !== nuevaImagen) {
        const rutaImagenVieja = path.resolve(imagenVieja);
        if (fs.existsSync(rutaImagenVieja)) fs.unlinkSync(rutaImagenVieja);
      }
    } else {
      await pool.query(
        `UPDATE usuarios SET 
          nombre=$1, correo=$2, telefono=$3, objetivo=$4, peso=$5, altura=$6
         WHERE id_usuarios=$7`,
        [nombre, correo, telefono, objetivo, peso, altura, id]
      );
    }

    const result = await pool.query(
      'SELECT id_usuarios, nombre, correo, telefono, objetivo, peso, altura, imagen_perfil FROM usuarios WHERE id_usuarios = $1',
      [id]
    );
    res.json({ mensaje: 'Usuario actualizado correctamente', usuario: result.rows[0] });
  } catch (error) {
    console.error(error);
    if (nuevaImagen) {
      const rutaNuevaImagen = path.resolve(nuevaImagen);
      if (fs.existsSync(rutaNuevaImagen)) fs.unlinkSync(rutaNuevaImagen);
    }
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

export default router;
