import express from 'express';
const router = express.Router();
const upload = require('../libs/storage');
const userCtrl = require('../controllers/userController')
// importar el modelo nota



// Agregar una usuario
router.post('/user',upload.fields([
  { name: 'filename', maxCount: 1 },
  { name: 'gallery', maxCount: 8 }
]), userCtrl.signUp);

module.exports = router;