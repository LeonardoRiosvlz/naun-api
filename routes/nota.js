import express from 'express';
const router = express.Router();
const upload = require('../libs/storage');
const notaCtrl = require('../controllers/nota')
// importar el modelo nota



// Agregar una nota
router.post('/nueva-nota',upload.fields([
  { name: 'filename', maxCount: 1 },
  { name: 'gallery', maxCount: 8 }
]), notaCtrl.saveNota);
// Get con parámetros
router.get('/nota/:id', notaCtrl.getNota);
  
  // Get con todos los documentos
  router.get('/nota',notaCtrl.getNotas);
  // Delete eliminar una nota
router.delete('/nota/:id', notaCtrl.deleteNota);
  // Put actualizar una nota
router.put('/nota/:id', upload.fields([
  { name: 'filename', maxCount: 1 },
  { name: 'gallery', maxCount: 8 }
]), notaCtrl.updateNota);
// Exportamos la configuración de express app
module.exports = router;