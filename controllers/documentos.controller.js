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
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.archivo= `https://naun.herokuapp.com/public/${filename}`;  
  }  
    body.creado=req.body.creado,
    body.nombre=req.body.nombre,
    body.consecutivo=req.body.consecutivo,
    body.version=req.body.version,
    body.sub_proceso=req.body.sub_proceso,
    body.elaboracion=req.body.elaboracion,
    body.revision=req.body.revision,
    body.aprobacion=req.body.aprobacion,
    body.fecha_alerta=req.body.fecha_alerta,
    body.fecha_emicion=req.body.fecha_emicion,
    body.intervalo=req.body.intervalo,
    body.archivo=req.body.archivo,
    body.normativas=req.body.normativas,
    body.cliente_id= req.body.cliente_id,
    body.sedes_id= req.body.sedes_id,
    body.elabora_id= req.body.elabora_id,
    body.aprueba_id= req.body.aprueba_id,
    body.revisa_id= req.body.revisa_id

  // Save
 await Areas.create(body)
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
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.archivo= `https://naun.herokuapp.com/public/${filename}`;  
  }  
    body.creado=req.body.creado,
    body.nombre=req.body.nombre,
    body.consecutivo=req.body.consecutivo,
    body.version=req.body.version,
    body.sub_proceso=req.body.sub_proceso,
    body.elaboracion=req.body.elaboracion,
    body.revision=req.body.revision,
    body.aprobacion=req.body.aprobacion,
    body.fecha_alerta=req.body.fecha_alerta,
    body.fecha_emicion=req.body.fecha_emicion,
    body.intervalo=req.body.intervalo,
    body.archivo=req.body.archivo,
    body.normativas=req.body.normativas,
    body.cliente_id= req.body.cliente_id,
    body.sedes_id= req.body.sedes_id,
    body.elabora_id= req.body.elabora_id,
    body.aprueba_id= req.body.aprueba_id,
    body.revisa_id= req.body.revisa_id

 await Documento.update(body,{
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
