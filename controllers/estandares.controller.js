const db = require("../models");
const Estandares = db.estandares;

// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.grupo_id) {
    res.status(400).send({
      message: "No puede ser vacio!"
    });
    return;
  }
  // Create 
  const body = {};
    body.numero= req.body.numero;
    body.descripcion=req.body.descripcion;
    body.criterio=req.body.criterio;
    body.codigo= req.body.codigo;
    body.cliente_id= req.body.cliente_id;
    body.grupo_id= req.body.grupo_id;
  // Save
 await Estandares.create(body)
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
  Estandares.findAll({
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
  Estandares.findAll({
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

  Estandares.findByPk(id)
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
    body.numero= req.body.numero;
    body.descripcion=req.body.descripcion;
    body.criterio=req.body.criterio;
    body.codigo= req.body.codigo;
    body.cliente_id= req.body.cliente_id;
    body.grupo_id= req.body.grupo_id;
  
    Estandares.update(body,{
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
  Estandares.destroy({
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
