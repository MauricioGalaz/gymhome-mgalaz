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
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); 
  }
});

// Filtrar los archivos permitidos
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType) {
    cb(null, true);  
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);  
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }  
});

export default upload;
