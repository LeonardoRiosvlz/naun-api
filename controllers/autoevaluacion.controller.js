const db = require("../models");
const Bases = db.basesae;
const Periodo = db.periodo;
const Grupos = db.grupoestandares;
const Estandares = db.estandares;
const Subgrupo = db.subgrupoestandares;
const Autoevaluacion = db.autoevaluacion;
const Mejoras = db.mejoras;
const User = db.user;
const config = require("../config/config");
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
  const body = {};
    body.evidencias=req.body.evidencias;
    body.periodo_id=req.body.periodo_id;
    if (req.files['gallery']) {
      let  gallery = req.files['gallery']  
      for (let index = 0; index < gallery.length; index++) {
          gallery[index]=`${config.server.SERVER+gallery[index].filename}`      
      }
      body.evidencias=gallery
    }
    body.descripcion_evidencias=req.body.descripcion_evidencias;
    body.fortalezas=req.body.fortalezas;
    body.estandar_id=req.body.estandar_id;
    body.oportunidad_mejoras=req.body.oportunidad_mejoras;
    body.puntaje_riesgo=req.body.puntaje_riesgo;
    body.puntaje_costo=req.body.puntaje_costo;
    body.puntaje_volumen=req.body.puntaje_volumen;
    body.base_id=req.body.base_id;
    body.grupo_id=req.body.grupo_id;
    if (req.body.subgrupo_id) { 
      body.subgrupo_id=req.body.subgrupo_id;
    }else{
      body.subgrupo_id=null;
    }
    body.cliente_id=req.body.cliente_id;

  // Save
 await Autoevaluacion.create(body)
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
 await Autoevaluacion.findAll({
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


exports.listarAdmin = async (req, res) => {
  const id = req.userId;
 await Autoevaluacion.findAll({
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
        model:Mejoras
      },
      {
        model:Periodo
      },
      {
        model:Bases
      },
      {
        model:Estandares
      },
    ],
  }).then(data => {
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
 await Autoevaluacion.findOne({
    offset: 0,
    where: {
      id: req.body.id
    }, // conditions
    order: [
      ['id', 'DESC'],
    ],
    include: [  
      {
        model:Mejoras
      },
      {
        model:Estandares
      },
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


// Find a single with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

 await Autoevaluacion.findByPk(id)
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
  body.evidencias=req.body.evidencias;
  body.periodo_id=req.body.periodo_id;
  if (req.files['gallery']) {
    let  gallery = req.files['gallery']  
    for (let index = 0; index < gallery.length; index++) {
        gallery[index]=`${config.server.SERVER+gallery[index].filename}`      
    }
    body.evidencias=gallery
  }
  body.descripcion_evidencias=req.body.descripcion_evidencias;
  body.fortalezas=req.body.fortalezas;
  body.estandar_id=req.body.estandar_id;
  body.oportunidad_mejoras=req.body.oportunidad_mejoras;
  body.puntaje_riesgo=req.body.puntaje_riesgo;
  body.puntaje_costo=req.body.puntaje_costo;
  body.puntaje_volumen=req.body.puntaje_volumen;
  body.base_id=req.body.base_id;
  body.grupo_id=req.body.grupo_id;
  if (req.body.subgrupo_id) { 
    body.subgrupo_id=req.body.subgrupo_id;
  }else{
    body.subgrupo_id=null;
  }

 await Autoevaluacion.update(body,{
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
      console.log(err);
      res.status(500).send({
        message: "Error al intentar editar el cargo con el id=" + id
      });
    });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  console.log(req)
  const id = req.body.id;
  Autoevaluacion.destroy({
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
