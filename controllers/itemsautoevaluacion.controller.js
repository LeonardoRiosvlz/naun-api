const db = require("../models");
const Autoevaluacion = db.itemsautoevaluacion;
const Accion = db.acciones;
const Base = db.basesae;
const Periodo = db.periodo;
const Mejoras = db.mejoras;
const User = db.user;
// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.autoevaluacionc_id) {
    res.status(400).send({
      message: "No puede ser vacio!"
    });
    return;
  }
  console.log(req.body);
  // Create 
  const data = {
    aplicabilidad : req.body.aplicabilidad,
    enfoque_sistematico: req.body.enfoque_sistematico,
    enfoque_proactivo: req.body.enfoque_proactivo,
    enfoque_em: req.body.enfoque_em,
    despliegue_institucional: req.body.despliegue_institucional,
    apropiacion_cie: req.body.apropiacion_cie,
    pertinencia: req.body.pertinencia,
    consistencia: req.body.consistencia,        
    avance_mediacion: req.body.avance_mediacion,
    tendencia: req.body.tendencia,
    comparacion: req.body.comparacion,
    promedio: req.body.promedio,
    autoevaluacionc_id: req.body.autoevaluacionc_id,
    estandar_id: req.body.numero,
    grupo_id: req.body.grupo_id,
    subgrupo_id: req.body.subgrupo_id,
    total: req.body.total,
  };
  // Save
 await Autoevaluacion.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
      return;
    });
};
 
exports.findAll = (req, res) => {
  const id = req.userId;
  Autoevaluacion.findAll({
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
 await Autoevaluacion.findAll({
    limit: 3000000,
    offset: 0,
    where: {
      autoevaluacionc_id: req.body.id
    }, // conditions
    order: [
      ['id', 'DESC'],
    ],

  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        console.log(err);
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving books."
      });
    });
};



exports.findPlan = async (req, res) => {
  const id =  req.body.id;
  console.log(id);
 await Autoevaluacion.findOne({
    offset: 0,
    where: {
      id:id
    }, // conditions
    include: [
      {
        model:Periodo,
        atributes: ['id','nombre'],
      }    
    ],
    
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
        console.log(err);
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving books."
      });
    });
};




// Update a Book by the id in the request
exports.update = async (req, res) => {
 
  const id = req.body.id;

 await Autoevaluacion.update({
    aplicabilidad : req.body.aplicabilidad,
    enfoque_sistematico: req.body.enfoque_sistematico,
    enfoque_proactivo: req.body.enfoque_proactivo,
    enfoque_em: req.body.enfoque_em,
    despliegue_institucional: req.body.despliegue_institucional,
    apropiacion_cie: req.body.apropiacion_cie,
    pertinencia: req.body.pertinencia,
    consistencia: req.body.consistencia,        
    avance_mediacion: req.body.avance_mediacion,
    tendencia: req.body.tendencia,
    comparacion: req.body.comparacion,
    promedio: req.body.promedio,
    total: req.body.total,
    estandar_id: req.body.numero,
    grupo_id: req.body.grupo_id,
    subgrupo_id: req.body.subgrupo_id,
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
await Autoevaluacion.destroy({
    where: { id: id }
  }).then(num => {
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
