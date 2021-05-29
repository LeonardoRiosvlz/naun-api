const bcrypt = require("bcrypt");
const db = require("../models");
const Clientes = db.cliente;
const User = db.user;
const Op = db.Op;

// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.foto= `https://naun.herokuapp.com/public/${filename}`;  
  }

  body.nombre= req.body.nombre;
  body.tipo= req.body.tipo;
  body.tipo= req.body.tipo;
  body.cedula= req.body.cedula;
  body.telefono= req.body.telefono;
  body.celular_personal= req.body.celular_personal;
  body.celular_corporativo= req.body.celular_corporativo;
  body.status= req.body.status;
  // Save Book in database
 await User.create({
     nombre:body.nombre,
     status:"activo",
     tipo:"Usuario",
     imagen:body.foto,
     email:body.email,
     password: bcrypt.hashSync(req.body.email, 8)
 }).then(data => {
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


async function CrearPerfil(body){
  // Save
  await  Perfil.create(body)
  .then( data => {
  })
  .catch(err => {
    return;
  });
}

exports.findFormato = async (req, res) => {
const id =req.body.id;
await  Abonos.findAll({
    limit: 3000000,
    offset: 0,
    where: {formato_id: id}, // conditions
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


exports.findAll = async (req, res) => {
    await  Clientes.findAndCountAll({
        limit: 3000000,
        offset: 0,
        where: { }, // conditions
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

 await Abonos.findByPk(id)
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
      body.logo= `https://naun.herokuapp.com/public/${filename}`;  
    }
    body.nombre= req.body.nombre;
    body.tipo= req.body.tipo;
    body.tipo= req.body.tipo;
    body.cedula= req.body.cedula;
    body.telefono= req.body.telefono;
    body.celular_personal= req.body.celular_personal;
    body.celular_corporativo= req.body.celular_corporativo;
    body.status= req.body.status;
    await Perfil.update(body,{
        where: { id: req.body.id }
      })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
        User.update({
            nombre:req.body.nombre,
            status:req.body.status
         },{
            where: { id: req.body.user_id }
          })
      } else {
        res.send({
          message: `No puede editar el perfil con  el =${id}. Tal vez el  no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar el cargo con el id=" + id
      });
    });
};

// Delete a Book with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.body.id;
 await Perfil.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cliente borrado satisfactoriamente!"
        });
        User.destroy({
            where: { id: req.body.user_id }
          })
      } else {
        res.send({
          message: `No se pudo borrar con el id=${id}. Tal vez el  no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar el cliente con el id=" + id
      });
    });
};

