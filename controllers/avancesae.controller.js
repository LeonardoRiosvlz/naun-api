const { mejoras, autoevaluacion, periodo, grupoestandares } = require("../models");
const db = require("../models");
const Accion = db.acciones;
const Avances = db.avancesae;
const Periodo = db.periodo;
const Estandar = db.estandares;
const Plan = db.planaccion;
const Base = db.basesae;
const Autoevaluacion = db.autoevaluacion;
const Mejoras = db.mejoras;
const Grupos = db.grupoestandares;
const User = db.user;
const config = require("../config/config");
// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.accion_id) {
    res.status(400).send({
      message: "No puede ser vacio!"
    });
    return;
  }
  console.log(req.body);
  // Create 
    const data = {}
    data.accion_id=req.body.accion_id;
    data.fecha_verificacion=req.body.fecha_verificacion;
    if (req.files['gallery']) {
        let  gallery = req.files['gallery']  
        for (let index = 0; index < gallery.length; index++) {
            gallery[index]=`${config.server.SERVER+gallery[index].filename}`      
        }
        data.evidencias=gallery
      }
    data.descripcion_evidencias=req.body.descripcion_evidencias;
    data.descripcion_avances=req.body.descripcion_avances;
    data.total=req.body.total;
    data.status=req.body.status;
  // Save
 await Avances.create(data)
    .then(data => {
      res.send(data);
      Accion.update({
         status:req.body.status,
         total:req.body.total 
      },{
        where: { id: req.body.accion_id }
     })
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
 await Avances.findAll({
    limit: 3000000,
    offset: 0,
    where: {
      plan_id:req.body.id
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


exports.listarAdmin = async (req, res) => {
  const id = req.userId;
 await Avances.findAll({
    limit: 3000000,
    offset: 0,
    where: {
      
    }, // conditions
    order: [
        ['id', 'DESC'],
    ],
    include: [
      {
        model:Accion,
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

 await Avances.findByPk(id,{

  include: [
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
  const data = {}
  data.fecha_verificacion=req.body.fecha_verificacion;
  if (req.files['gallery']) {
      let  gallery = req.files['gallery']  
      for (let index = 0; index < gallery.length; index++) {
          gallery[index]=`${config.server.SERVER+gallery[index].filename}`      
      }
      data.evidencias=gallery
  }
  data.descripcion_evidencias=req.body.descripcion_evidencias;
  data.descripcion_avances=req.body.descripcion_avances;
  data.total=req.body.total;
  data.status=req.body.status;

    await Avances.update(data,{
        where: { id: req.body.id }
     })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
        Accion.update({
            status:req.body.status,
            total:req.body.total 
         },{
           where: { id: req.body.accion_id }
        })
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
  Avances.destroy({
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
