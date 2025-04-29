import express from 'express';
import upload from '../config/uploadConfig.js';

const router = express.Router();

// Ruta para subir una imagen
router.post('/imagen', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: 'No se subió ningún archivo.' });
  }
  res.json({
    mensaje: 'Imagen subida exitosamente',
    ruta: `/uploads/${req.file.filename}`
  });
});

export default router;
