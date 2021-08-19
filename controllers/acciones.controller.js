const { mejoras, autoevaluacion, periodo, grupoestandares } = require("../models");
const db = require("../models");
const Accion = db.acciones;
const Periodo = db.periodo;
const Estandar = db.estandares;
const Plan = db.planaccion;
const Base = db.basesae;
const Autoevaluacion = db.autoevaluacion;
const Mejoras = db.mejoras;
const Grupos = db.grupoestandares;
const User = db.user;
// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.mejora_id) {
    res.status(400).send({
      message: "No puede ser vacio!"
    });
    return;
  }
  // Create 
    const data = {}
    data.mejora_id=req.body.mejora_id;
    data.proceso_id=req.body.proceso_id;
    if (req.body.subproceso_id==="NA"|| req.body.subproceso_id==null || req.body.subproceso_id) {
    }else{
      body.subproceso_id=req.body.subproceso_id;
    }
    data.clasificacion_id=req.body.clasificacion_id;
    data.responsable_id=req.body.responsable_id;
    data.fecha_ejecucion=req.body.fecha_ejecucion;
    data.fecha_programada=req.body.fecha_programada;
    data.evidencia_solicitada=req.body.evidencia_solicitada;
    data.total=0;
    data.descripcion_accion=req.body.descripcion_accion;
  // Save
 await Accion.create(data)
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
 await Accion.findAll({
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
 await Accion.findAll({
    limit: 3000000,
    offset: 0,
    where: {
      
    }, // conditions
    order: [
      ['id', 'DESC'],
    ],
    include: [
      {
        model:Mejoras,
        where:{
          plan_id:req.body.id,
        },
        include: [
          {
            model:Plan,
            include: [
              {
                model:Base,
                include: [
                  {
                    model:periodo,
                  }
                ],
              }
            ],
            
          },
          {
            model:Autoevaluacion,
            include: [
              {
                model:Grupos
              },
              {
                model:Estandar
              }
            ],
          }
        ],
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

 await Accion.findByPk(id,{

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
  const data = {}
  data.mejora_id=req.body.mejora_id;
  data.proceso_id=req.body.proceso_id;
  if (req.body.subproceso_id==="NA"|| req.body.subproceso_id==null || req.body.subproceso_id) {
  }else{
    body.subproceso_id=req.body.subproceso_id;
  }
  data.clasificacion_id=req.body.clasificacion_id;
  data.responsable_id=req.body.responsable_id;
  data.fecha_ejecucion=req.body.fecha_ejecucion;
  data.fecha_programada=req.body.fecha_programada;
  data.evidencia_solicitada=req.body.evidencia_solicitada;
  data.descripcion_accion=req.body.descripcion_accion;

    await Accion.update(data,{
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
  Accion.destroy({
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
