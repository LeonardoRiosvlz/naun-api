const db = require("../models");
const Eventos = db.eventos;
const User = db.user;
// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "No puede ser vacio!"
    });
    return;
  }
  // Create 
  const body = {};
  
  body.id=req.body.id;
  body.nombre=req.body.nomre;
  body.descripcion=req.body.descripcion;
  body.observaciones=req.body.observaciones;
  body.lugar=req.body.lugar;
  body.inivitados_externos=req.body.inivitados_externos;
  body.periodo=req.body.periodo;
  body.status=req.body.status;
  body.fecha_programada=req.body.fecha_programada;
  body.fecha_ejecucion=req.body.fecha_ejecucion;
  body.cliente_id=req.body.cliente_id;
  body.clasificacion_id=req.body.clasificacion_id;
  // Save
 await Eventos.create(body)
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
 await Eventos.findAll({
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
 await Eventos.findAll({
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
await  Eventos.findByPk(id)
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
  const id = req.body.id;
  const body = {};
  body.id=req.body.id;
  body.nombre=req.body.nomre;
  body.descripcion=req.body.descripcion;
  body.observaciones=req.body.observaciones;
  body.lugar=req.body.lugar;
  body.inivitados_externos=req.body.inivitados_externos;
  body.periodo=req.body.periodo;
  body.status=req.body.status;
  body.fecha_programada=req.body.fecha_programada;
  body.fecha_ejecucion=req.body.fecha_ejecucion;
  body.cliente_id=req.body.cliente_id;
  body.clasificacion_id=req.body.clasificacion_id;
await  Eventos.update(body,{
    where: { id: req.body.id }
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
exports.delete = (req, res) => {
  const id = req.body.id;
  Eventos.destroy({
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
