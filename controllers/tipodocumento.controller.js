const db = require("../models");
const Tipo = db.tipodocumento;

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
    prefijo: req.body.prefijo,
    documento: req.body.documento,
    cliente_id: req.body.cliente_id,
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

exports.findAll = (req, res) => {
  const id = req.userId;
  Tipo.findAll({
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
  Tipo.findAll({
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
exports.find= async (req, res) => {
  const id = req.body.id;

await  Tipo.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `erro al editar el cargo= ${id}`
      });
    });
};

// Find a single with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tipo.findByPk(id)
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
  console.log(req)
  const id = req.body.id;

  Tipo.update({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    prefijo: req.body.prefijo,
    cliente_id: req.body.cliente_id,
    },{
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
  console.log(req)
  const id = req.body.id;
  Tipo.destroy({
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



// Update a Book by the id in the request
exports.updateDocument = async (req, res) => {

  const id = req.body.id;
  const body = {};
  body.documento= req.body.documento
  await Tipo.update(body,{
    where: { id: req.body.id }
  }).then(num => {
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

