const db = require("../models");
const Mejora = db.mejoras;
const Periodo = db.periodo;
const Autoevaluacion = db.autoevaluacion;
const Base = db.basesae;
const User = db.user;
// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.autoevaluacion_id) {
    res.status(400).send({
      message: "No puede ser vacio!"
    });
    return;
  }
  // Create 
  const data = {
    oportunidad_mejoras: req.body.oportunidad_mejoras,
    puntaje_riesgo:  req.body.puntaje_riesgo,
    puntaje_costo:  req.body.puntaje_costo,
    puntaje_volumen: req.body.puntaje_volumen,
    total: req.body.total,
    autoevaluacion_id: req.body.autoevaluacion_id,
  };
  // Save
 await Mejora.create(data)
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
 await Mejora.findAll({
    limit: 3000000,
    offset: 0,
    where: {
  
    }, // conditions
    order: [
      ['id', 'DESC'],
    ],
    include: [
      {
        model:Periodo
      }
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



exports.find = async (req, res) => {
    console.log(req.body.id);
   await Mejora.findOne({
      offset: 0,
      where: {
        id: req.body.id
      }, // conditions
      order: [
        ['id', 'DESC'],
      ],
    }).then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.send(500).send({
          message: err.message || "Some error accurred while retrieving books."
        });
      });
  };
  


exports.listarAdmin = async (req, res) => {
  const id = req.userId;
 await Mejora.findAll({
    limit: 3000000,
    offset: 0,
    where: {
      cliente_id: req.body.cliente_id
    }, // conditions
    order: [
      ['id', 'DESC'],
    ],
    include: [
      {
        model:Periodo
      }
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
exports.findBase = async (req, res) => {
  const id = req.body.id;

 await Mejora.findByPk(id,{

  include: [
    {
      model:Periodo
    }
  ],
 })
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

 await Mejora.update({
    oportunidad_mejoras: req.body.oportunidad_mejoras,
    puntaje_riesgo:  req.body.puntaje_riesgo,
    puntaje_costo:  req.body.puntaje_costo,
    status:  req.body.status,
    puntaje_volumen: req.body.puntaje_volumen,
    total: req.body.total,
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
  console.log(req)
  const id = req.body.id;
  Mejora.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "borrado satisfactoriamente!"
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
