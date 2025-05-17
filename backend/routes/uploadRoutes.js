import express from 'express';
import upload from '../config/uploadConfig.js';
import path from 'path';

const router = express.Router();

// Ruta para subir una imagen
router.post('/imagen', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: 'No se subió ningún archivo.' });
  }


  const extensionesPermitidas = ['.png', '.jpg', '.jpeg', '.gif'];
  const extension = path.extname(req.file.originalname).toLowerCase();
  if (!extensionesPermitidas.includes(extension)) {
    return res.status(400).json({ mensaje: 'Tipo de archivo no permitido.' });
  }

  res.status(200).json({
    mensaje: 'Imagen subida exitosamente',
    ruta: `/uploads/${req.file.filename}`
  });
});

export default router;
