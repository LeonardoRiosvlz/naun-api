const db = require("../models");
const Tipo = db.tipoProceso;
const Procesos = db.procesos;
const Subprocesos = db.subprocesos;
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
    version: req.body.version,
    codigo_prefijo: req.body.codigo_prefijo,
    tiene_sp: req.body.tiene_sp,
    objetivos: req.body.objetivos,
    alcance: req.body.alcance,
    estado: "Borrador",
    actividades: req.body.actividades,
    recursos: req.body.recursos,
    tipo_id: req.body.tipo_id,
    lider_id: req.body.lider_id,
    cliente_id: req.body.cliente_id,
    normativas: req.body.normativas,
    fecha_emicion: req.body.fecha_emicion,
  };
  // Save
 await Procesos.create(data)
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

exports.listarAdmin = async (req, res) => {
  await  Procesos.findAndCountAll({
      limit: 3000000,
      offset: 0,
      where: { cliente_id :req.body.cliente_id  }, // conditions
      order: [
        ['id', 'DESC'],
      ],
      include: [  
        {
          model:Subprocesos,
          attributes:['nombre','id'],
        },
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

exports.find = async (req, res) => {
  await  Procesos.findAndCountAll({
      limit: 3000000,
      offset: 0,
      where: { 
        id: req.body.id
        }, // conditions
      order: [
        ['id', 'DESC'],
      ],
      include: [  
        {
          model:Subprocesos,
        },
        {
          model:Tipo,
          attributes:['nombre','descripcion','id'],
        },
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

exports.findtipo = async (req, res) => {
  await  Procesos.findAndCountAll({
      limit: 3000000,
      offset: 0,
      where: { 
        tipo_id: req.body.tipo_id,
        tiene_sp: "Si",
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

// Update a Book by the id in the request
exports.update = async (req, res) => {
  console.log(req)
  const id = req.body.id;

 await Procesos.update({
    nombre: req.body.nombre,
    version: req.body.version,
    codigo_prefijo: req.body.codigo_prefijo,
    tiene_sp: req.body.tiene_sp,
    objetivos: req.body.objetivos,
    alcance: req.body.alcance,
    actividades: req.body.actividades,
    recursos: req.body.recursos,
    tipo_id: req.body.tipo_id,
    lider_id: req.body.lider_id,
    cliente_id: req.body.cliente_id,
    normativas: req.body.normativas,
    fecha_emicion: req.body.fecha_emicion,
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
          message: `No puede editar el tipo de proceso con el  el =${id}. Tal vez el tipo de proceso no existe o la peticion es vacia!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar el tipo de proceso con el id=" + id
      });
    });
};

// Delete a Book with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.body.id;
 await Procesos.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "tipo de proceso borrado satisfactoriamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar el tipo de proceso con el id=${id}. Tal vez el tipo de proceso no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar el tipo de proceso con el id=" + id
      });
    });
};


