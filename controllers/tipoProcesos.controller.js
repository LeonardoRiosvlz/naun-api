const db = require("../models");
const Tipo = db.tipoProceso;

// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({
      message: "No puede ser vacio!"
    });
    return;
  }
  // Create 
  const data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  };
  // Save
 await Tipo.create(data)
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


exports.findAll = async (req, res) => {
  const id = req.userId;
 await Tipo.findAll({
    limit: 3000000,
    offset: 0,
    where: {
  
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
  console.log(req)
  const id = req.body.id;

 await Tipo.update({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    },{
    where: { id: id }
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
 await Tipo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cargo borrado satisfactoriamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar el cargo con el id=${id}. Tal vez el cargo no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar el cargo con el id=" + id
      });
    });
};
