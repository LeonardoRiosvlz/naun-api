'use strict'
import Nota from '../models/nota';
const {appConfig}=  require('../config')

// Agregar una nota
async function saveNota (req, res) {


  const body = JSON.parse(req.body.form);
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    const {host,port}=appConfig
    body.imgUrl= `http://127.0.0.1:4000/public/${filename}`
  }
  if (req.files['gallery']) {
    let  gallery = req.files['gallery']  
    for (let index = 0; index < gallery.length; index++) {
        const {host,port}=appConfig 
        gallery[index]=`http://127.0.0.1:4000/public/${gallery[index].filename}`      
      console.log(gallery[index].filename);
    }
    body.gallery=gallery
  }
  
  try {
    const notaDB = await Nota.create(body);
    res.status(200).json(notaDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
};
// Get con parámetros
async function getNota (req, res) {
    const _id = req.params.id;
   await Nota.findById(_id, (err, notas) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!notas) return res.status(404).send({message: `El producto no existe`})
    
        res.status(200).send({ notas })
      })
  };
  
  // Get con todos los documentos
  async function getNotas (req, res) {
   await Nota.find({}, (err, notas) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!notas) return res.status(404).send({message: 'No existen productos'})
        res.json(notas); 
      })
  };
  // Delete eliminar una nota
  async function deleteNota (req, res) {
    const _id = req.params.id;

   await Nota.findById(_id, (err, product) => {
      if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
  
      product.remove(err => {
        if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
        res.status(200).send({message: 'El producto ha sido eliminado'})
      })
    })
  };
  // Put actualizar una nota
  function updateNota (req, res) {
    console.log(req.body.form);
    const _id = req.params.id;
    const body = JSON.parse(req.body.form);
    if(req.files['filename']){
      const { filename } = req.files['filename'][0]
      const {host,port}=appConfig
      body.imgUrl= `http://127.0.0.1:4000/public/${filename}`
    }
    if (req.files['gallery']) {
      let  gallery = req.files['gallery']  
      for (let index = 0; index < gallery.length; index++) {
          const {host,port}=appConfig 
          gallery[index]=`http://127.0.0.1:4000/public/${gallery[index].filename}`      
        console.log(gallery[index].filename);
      }
      body.gallery=gallery
    }

    Nota.findByIdAndUpdate(_id, body, (err, notaUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})
    
        res.status(200).send({ nota: notaUpdated })
      })
  };
// Exportamos la configuración de express app
module.exports = {
    getNota,
    getNotas,
    saveNota,
    updateNota,
    deleteNota
  }