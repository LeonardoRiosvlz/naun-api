const db = require("../models");
const Grupo = db.subgrupoestandares;

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
  const body = {};
    body.nombre= req.body.nombre;
    body.descripcion=req.body.descripcion;
    body.codigo= req.body.codigo;
    body.desde= req.body.desde;
    body.hasta= req.body.hasta;  
    body.grupo_id= 1;  
  // Save
 await Grupo.create(body)
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
  Grupo.findAll({
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


exports.listarAdmin = (req, res) => {
  const id = req.userId;
  Grupo.findAll({
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
exports.find = (req, res) => {
  const id = req.params.id;

  Grupo.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `erro al editar el normatividad= ${id}`
      });
    });
};

// Update a Book by the id in the request
exports.update = (req, res) => {
  const id = req.body.id;
  // Create 
  const body = {};
    body.nombre= req.body.nombre;
    body.descripcion=req.body.descripcion;
    body.codigo= req.body.codigo;
    body.desde= req.body.desde;
    body.hasta= req.body.hasta; 
  Grupo.update(body,{
    where: { id: req.body.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
      } else {
        res.send({
          message: `No puede editar el coargo con el  el =${id}. Tal vez el tipo no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar el tipo con el id=" + id
      });
    });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;
  Grupo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "tipo borrado satisfactoriamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar el tipo con el id=${id}. Tal vez el tipo no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar el tipo con el id=" + id
      });
    });
};

