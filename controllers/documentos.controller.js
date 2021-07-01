const { vdocumento } = require("../models");
const db = require("../models");
const Documento = db.documento;
const Tipo_documento = db.tipodocumento;
const Procesos = db.procesos;
const Subprocesos = db.subprocesos;
const Tipo = db.tipoProceso;
const Versiones = db.versiones;
const Notificacion = db.notificacion;
const VD = db.vdocumento;
const Cargos = db.cargos;
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
    body.archivo= `https://naunapp.herokuapp.com/public/${filename}`;  
  }  
    body.creado=req.body.creado;
    body.nombre=req.body.nombre;
    body.consecutivo=req.body.consecutivo;
    body.version=req.body.version;
    body.subproceso_id=req.body.subproceso_id;
    if (req.body.elaboracion) {
      body.elaboracion=req.body.elaboracion;
    }
    if (req.body.revision) {
      body.revision=req.body.revision;
    }
    if (req.body.aprobacion) {
      body.aprobacion=req.body.aprobacion;
    }
    body.fecha_alerta=req.body.fecha_alerta;
    body.fecha_emicion=req.body.fecha_emicion;
    body.intervalo=req.body.intervalo;
    body.normativas=req.body.normativas;
    body.cliente_id= req.body.cliente_id;
    body.sedes_id= req.body.sedes_id;
    body.elabora_id= req.body.elabora_id;
    body.aprueba_id= req.body.aprueba_id;
    body.revisa_id= req.body.revisa_id;
    body.proceso_id= req.body.proceso_id;
    body.tipo_id= req.body.tipo_id;
    body.status= req.body.status;

  // Save
 await Documento.create(body)
    .then(data => {
      res.send(data);
      const elabora = {
        titulo: `Documento a realizar`,
        descripcion: `Se programó el documento  ${req.body.nombre}`,
        origen: "",
        modulo: "gestordoc",
        icon: "ri-money-dollar-box-line",
        color: "avatar-title bg-success rounded-circle font-size-16",
        uid: req.body.elabora_id,
      };
      CrearNotificacion(elabora);
      const revisa = {
        titulo: `Documento a revisar`,
        descripcion: `Se programó el documento  ${req.body.nombre} que debes revisar`,
        origen: "",
        modulo: "gestordoc",
        icon: "ri-money-dollar-box-line",
        color: "avatar-title bg-success rounded-circle font-size-16",
        uid: req.body.revisa_id,
      };
      CrearNotificacion(revisa);
      const aprueba = {
        titulo: `Documento a aprobar`,
        descripcion: `Se programó el documento  ${req.body.nombre} que debes aprobar`,
        origen: "",
        modulo: "gestordoc",
        icon: "ri-money-dollar-box-line",
        color: "avatar-title bg-success rounded-circle font-size-16",
        uid: req.body.aprueba_id,
      };
      CrearNotificacion(aprueba);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
      return;
    });
};



exports.createVersion = async (req, res) => {
  // Validate request
  if (!req.body.documento_id) {
    res.status(400).send({
      message: "No puede ser vacio!"
    });
    return;
  }
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.archivo= `https://naunapp.herokuapp.com/public/${filename}`;  
  }
  if(req.files['diagrama']){
    const { filename } = req.files['diagrama'][0]
    body.diagramas= `https://naunapp.herokuapp.com/public/${filename}`;  
  }    
    body.observaciones_documentos=req.body.observaciones_documentos;
    body.observaciones_diagramas=req.body.observaciones_diagramas;
    body.documento_id=req.body.documento_id;
    // Save
    await Versiones.create(body)
    .then(data => {
      res.send(data);
      const revisa = {
        titulo: `Nuevo documento `,
        descripcion: `Se subió un documento que debes revisar`,
        origen: "",
        modulo: "gestordoc",
        icon: "ri-money-dollar-box-line",
        color: "avatar-title bg-success rounded-circle font-size-16",
        uid: req.body.revisa_id,
      };
      CrearNotificacion(revisa);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
      return;
    });
};



// Update a Book by the id in the request
exports.updateVersion = async (req, res) => {

  const id = req.body.id;
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.archivo= `https://naunapp.herokuapp.com/public/${filename}`;  
  }
  if(req.files['filename']){
    const { diagrama } = req.files['diagrama'][0]
    body.diagramas= `https://naunapp.herokuapp.com/public/${diagrama}`;  
  }   
  if(req.body.status){
    body.status=req.body.status; 
  }   
    body.observaciones_documentos=req.body.observaciones_documentos;
    body.observaciones_diagramas=req.body.observaciones_diagramas;
    body.documento_id=req.body.documento_id;
  await Versiones.update(body,{
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
exports.deleteVersion = async (req, res) => {
  const id = req.body.id;
 await Versiones.destroy({
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



// Update a Book by the id in the request
exports.updateDocument = async (req, res) => {

  const id = req.body.id;
  const body = {};
body.documento= req.body.documento
await Documento.update(body,{
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

exports.findVersion= async (req, res) => {
  const id = req.body.id;

await  Versiones.findOne({
  limit: 3000000,
  offset: 0,
  where: {
    id:id
  }, // conditions
  include: [  
    {
      model:Documento,
      include: [  
        {
          model:Procesos,
          include: [  
            {
              model:Tipo,
            }
          ]
        },
        {
          model:Subprocesos,
        }
      ]
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
      res.status(500).send({
        message: `erro al editar el cargo= ${id}`
      });
    });
};


async function CrearNotificacion(datos){
  // Save
  await  Notificacion.create(datos)
  .then( data => {
    notificar(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Book."
    });
    return;
  });
}

async function notificar(data){
await  Cargos.findByPk(data.uid)
.then(datas => {
 console.log(datas);
 global.io.to(datas.canal).emit('cliente', data);
})
  .catch(err => {
  res.status(500).send({
    message: `erro al editar el cargo= ${id}`
  });
});
}



exports.findAll = async (req, res) => {
  console.log(req.body);
  const id = req.userId;
 await Documento.findAll({
    limit: 3000000,
    offset: 0,
    where: {
      cliente_id:req.body.cliente_id
    }, // conditions
    include: [  
      {
        model:VD,
        include: [  
          {
            model:Versiones,
          },
        ]
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

// Find a single with an id
exports.find= async (req, res) => {
  const id = req.body.id;

await  Documento.findOne({
  limit: 3000000,
  offset: 0,
  where: {
    id:id
  }, // conditions
  include: [  
    {
      model:VD,
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
      res.status(500).send({
        message: `erro al editar el cargo= ${id}`
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
    include: [  
      {
        model:Tipo_documento
      },
      {
        model:Procesos
      },
      {
        model:VD
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

// Update a Book by the id in the request
exports.update = async (req, res) => {
  const id = req.body.id;
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.archivo= `https://naunapp.herokuapp.com/public/${filename}`;  
  }  
    body.creado=req.body.creado;
    body.nombre=req.body.nombre;
    body.consecutivo=req.body.consecutivo;
    body.version=req.body.version;
    body.elaboracion=req.body.elaboracion;
    body.subproceso_id=req.subproceso_id;
    if (req.body.elaboracion) {
      body.elaboracion=req.body.elaboracion;
    }
    if (req.body.revision) {
      body.revision=req.body.revision;
    }
    if (req.body.aprobacion) {
      body.aprobacion=req.body.aprobacion;
    }
    body.fecha_emicion=req.body.fecha_emicion;
    body.intervalo=req.body.intervalo;
    body.normativas=req.body.normativas;
    body.cliente_id= req.body.cliente_id;
    body.sedes_id= req.body.sedes_id;
    body.elabora_id= req.body.elabora_id;
    body.aprueba_id= req.body.aprueba_id;
    body.revisa_id= req.body.revisa_id;
    body.proceso_id= req.body.proceso_id;
    body.tipo_id= req.body.tipo_id;
    body.status= req.body.status;

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
