const bcrypt = require("bcrypt");
const { perfiles } = require("../models");
const db = require("../models");
const Normatividad = db.normativas;
const Op = db.Op;

 
// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.cliente_id) {
    res.status(400).send({
      message: "cliente no puede ser null!"
    });
    return;
  }
  // Create a Book
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.soporte= `https://naun.herokuapp.com/public/${filename}`;  
  }
  body.cliente_id= req.body.cliente_id;
  body.nombre= req.body.nombre;
  body.tipo= req.body.tipo;
  body.descripcion= req.body.descripcion;
  // Save Book in database
 await Normatividad.create(body).then(data => {
      res.send(data);
      body.user_id= data.id;
      CrearPerfil(body);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
    }); 
};




exports.findAll = async (req, res) => {
    await  Normatividad.findAll({
        limit: 3000000,
        offset: 0,
        where: { 
           cliente_id: req.body.cliente_id
        }, // conditions
        order: [
          ['id', 'DESC'],
        ],
      })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.send(500).send({
            message: err.message || "Some error accurred while retrieving books."
          });
        });
    };




    exports.listarAdmin = async (req, res) => {
      await  Normatividad.findAndCountAll({
          limit: 3000000,
          offset: 0,
          where: { 
            cliente_id: req.body.cliente_id
          }, // conditions
          order: [
            ['id', 'DESC'],
          ],
        })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.send(500).send({
              message: err.message || "Some error accurred while retrieving books."
            });
          });
      };
// Find a single with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

 await Normatividad.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `erro al editar el cargo= ${id}`
      });
    });
};

// Update a Book by the id in the request
exports.update = async (req, res) => {
    const body={};
    if(req.files['filename']){
      const { filename } = req.files['filename'][0]
      body.soporte= `https://naun.herokuapp.com/public/${filename}`;  
    }
    body.cliente_id= req.body.cliente_id;
    body.nombre= req.body.nombre;
    body.tipo= req.body.tipo;
    body.descripcion= req.body.descripcion;
    await Normatividad.update(body,{
        where: { id: req.body.id }
      })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
      } else {
        res.send({
          message: `No puede editar la normativa con  el =${id}. Tal vez el  no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar la normativa con el id=" + id
      });
    });
};

// Delete a Book with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.body.id;
 await Normatividad.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "normativa borrada satisfactoriamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar con la normativa id=${id}. Tal vez el  no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar la normativa con el id=" + id
      });
    });
};

