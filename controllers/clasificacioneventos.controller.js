const db = require("../models");
const Clasificacion = db.clasificacioneventos;
const User = db.user;
// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.cliente_id) {
    res.status(400).send({
      message: "No puede ser vacio!"
    });
    return;
  }
  // Create 
  const data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    color: req.body.color,
    cliente_id: req.body.cliente_id,
  };
  // Save
 await Clasificacion.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
      return;
    });
};

exports.findAll = (req, res) => {
  const id = req.userId;
  Clasificacion.findAll({
    limit: 3000000,
    offset: 0,
    where: {
  
    }, // conditions
    include: [  
        {
          model:User,
          attributes:['nombre']
        },
      ],
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
  const id = req.userId;
 await Clasificacion.findAll({
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



// Update a Book by the id in the request
exports.update = async (req, res) => {
 
  const id = req.body.id;

 await Clasificacion.update({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    color: req.body.color,
    },{
    where: {
         id: req.body.id
     }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
      } else {
        res.send({
          message: `No puede editar el coargo con el  el =${id}. Tal vez el cargo no existe o la peticion es vacia!`
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
await Clasificacion.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: " borrado satisfactoriamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar el cargo con el id=" + id
      });
    });
};
