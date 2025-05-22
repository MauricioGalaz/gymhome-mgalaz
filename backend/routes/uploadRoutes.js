import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Filtro para extensiones permitidas
const fileFilter = (req, file, cb) => {
  const extensionesPermitidas = ['.png', '.jpg', '.jpeg', '.gif'];
  const extension = path.extname(file.originalname).toLowerCase();
  if (extensionesPermitidas.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post('/imagen', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: 'No se subió ningún archivo.' });
  }

  res.status(200).json({
    mensaje: 'Imagen subida exitosamente',
    ruta: `/uploads/${req.file.filename}`
  });
});

// Manejo de errores de multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === 'Tipo de archivo no permitido') {
    return res.status(400).json({ mensaje: err.message });
  }
  next(err);
});

export default router;
