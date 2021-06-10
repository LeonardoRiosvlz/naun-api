const db = require("../models");
const Documento = db.documento;

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
    
    creado:req.body.creado,
    nombre:req.body.nombre,
    consecutivo:req.body.consecutivo,
    version:req.body.version,
    sub_proceso:req.body.sub_proceso,
    elaboracion:req.body.elaboracion,
    revision:req.body.revision,
    aprobacion:req.body.aprobacion,
    fecha_alerta:req.body.fecha_alerta,
    fecha_emicion:req.body.fecha_emicion,
    intervalo:req.body.intervalo,
    archivo:req.body.archivo,
    normativas:req.body.normativas,
    cliente_id: req.body.cliente_id,
    sedes_id: req.body.sedes_id,
    elabroa_id: req.body.elabroa_id,
    aprueba_id: req.body.aprueba_id,
    revisa_id: req.body.revisa_id

  };
  // Save
 await Areas.create(data)
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
 await Areas.findAll({
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
 await Documento.findAll({
    limit: 3000000,
    offset: 0,
    where: {
      cliente_id:req.body.cliente_id
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

// Update a Book by the id in the request
exports.update = async (req, res) => {
  const id = req.body.id;

 await Documento.update({
    creado:req.body.creado,
    nombre:req.body.nombre,
    consecutivo:req.body.consecutivo,
    version:req.body.version,
    sub_proceso:req.body.sub_proceso,
    elaboracion:req.body.elaboracion,
    revision:req.body.revision,
    aprobacion:req.body.aprobacion,
    fecha_alerta:req.body.fecha_alerta,
    fecha_emicion:req.body.fecha_emicion,
    intervalo:req.body.intervalo,
    archivo:req.body.archivo,
    normativas:req.body.normativas,
    cliente_id: req.body.cliente_id,
    sedes_id: req.body.sedes_id,
    elabroa_id: req.body.elabroa_id,
    aprueba_id: req.body.aprueba_id,
    revisa_id: req.body.revisa_id
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
 await Documento.destroy({
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
