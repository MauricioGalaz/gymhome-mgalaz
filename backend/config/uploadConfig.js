// backend/config/uploadConfig.js
import multer from 'multer';
import path from 'path';

// Definir el almacenamiento de los archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Directorio donde se guardarán los archivos subidos
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    // Cambiar el nombre del archivo para evitar conflictos
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Agregar extensión
  }
});

// Filtrar los archivos permitidos
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType) {
    cb(null, true);  // Archivo válido
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);  // Tipo de archivo no permitido
  }
};

// Configurar multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }  // Límite de tamaño de archivo (10 MB)
});

export default upload;
