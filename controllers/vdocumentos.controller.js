const { vdocumento } = require("../models");
const db = require("../models");
const Documento = db.documento;
const Tipo_documento = db.tipodocumento;
const Procesos = db.procesos;
const Subprocesos = db.subprocesos;
const Tipo = db.tipoProceso;
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
    body.elabora_v_id= req.body.elabora_v_id;
    body.aprueba_v_id= req.body.aprueba_v_id;
    body.revisa_v_id= req.body.revisa_v_id;
    body.proceso_id= req.body.proceso_id;
    body.tipo_id= req.body.tipo_id;
    body.documento_id= req.body.documento_id;
    body.status= "En elaboración";

  // Save
 await VD.create(body)
    .then(data => {
      res.send(data);
      const elabora = {
        titulo: `Documento a realizar`,
        descripcion: `Se programó el documento  ${req.body.nombre}`,
        origen: "",
        modulo: "gestordoc",
        icon: "ri-money-dollar-box-line",
        color: "avatar-title bg-success rounded-circle font-size-16",
        uid: req.body.elabora_v_id,
        rid: req.userId,
      };
      CrearNotificacion(elabora);
      const revisa = {
        titulo: `Documento a revisar`,
        descripcion: `Se programó el documento  ${req.body.nombre} que debes revisar`,
        origen: "",
        modulo: "gestordoc",
        icon: "ri-money-dollar-box-line",
        color: "avatar-title bg-success rounded-circle font-size-16",
        uid: req.body.revisa_v_id,
        rid: req.userId,
      };
      CrearNotificacion(revisa);
      const aprueba = {
        titulo: `Documento a aprobar`,
        descripcion: `Se programó el documento  ${req.body.nombre} que debes aprobar`,
        origen: "",
        modulo: "gestordoc",
        icon: "ri-money-dollar-box-line",
        color: "avatar-title bg-success rounded-circle font-size-16",
        uid: req.body.aprueba_v_id,
        rid: req.userId,
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


// Find a single with an id
exports.find= async (req, res) => {
await  VD.findAll({
  limit: 3000000,
  offset: 0,
  where: {
    documento_id:req.body.documento_id
  }, // conditions
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

exports.findOne= async (req, res) => {

  await  VD.findOne({
    limit: 3000000,
    offset: 0,
    where: {
      id:req.body.id
    }, // conditions
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
  


// Update a Book by the id in the request
exports.update = async (req, res) => {
  const id = req.body.id;
  const body={};
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
    body.elabora_v_id= req.body.elabora_v_id;
    body.aprueba_v_id= req.body.aprueba_v_id;
    body.revisa_v_id= req.body.revisa_v_id;
    body.proceso_id= req.body.proceso_id;
    body.tipo_id= req.body.tipo_id;
    body.status= req.body.status;

 await VD.update(body,{
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
 await VD.destroy({
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


/// acciones de edicion ///

// Update a Book by the id in the request
exports.elaborar = async (req, res) => {
  const nombre = req.body.nombre;
  const id = req.body.id;
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.archivo= `https://naunapp.herokuapp.com/public/${filename}`;  
    body.firma_elabora= `https://naunapp.herokuapp.com/public/${filename}`; 
  } 
  if(req.files['diagrama']){
    const { filename } = req.files['diagrama'][0]
    body.diagramas= `https://naunapp.herokuapp.com/public/${filename}`;  
  } 
  body.observaciones_elaboracion= req.body.observaciones_elaboracion;
  body.nombre_elabora= req.name;
  body.status_elaboracion ="Elaborado";
  body.status ="En aprobación";
  
 await VD.update(body,{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
        const notificacion = {
          titulo: `Documento Pendiente por revisar (${nombre})`,
          descripcion: `Se elaboro un documento`,
          origen: "",
          modulo: `gestion-versiones/${id}`,
          icon: "ri-money-dollar-box-line",
          color: "avatar-title bg-success rounded-circle font-size-16",
          uid: req.body.revisa_v_id,
          rid: req.userId,
        };
        CrearNotificacion(notificacion);
      } else {
        res.send({
          message: `No puede editar!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar"
      });
    });
};


// Update a Book by the id in the request
exports.revisar = async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const nombre = req.body.nombre;
  const status = req.body.status_revision;
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.firma_revisa= `https://naunapp.herokuapp.com/public/${filename}`;  
  } 
  body.observaciones_revision    =  req.body.observaciones_revision;
  body.observaciones_documentos =  req.body.observaciones_documentos;
  body.observaciones_diagramas   =  req.body.observaciones_diagramas;
  body.nombre_revisa= req.name;
  if (req.body.status_revision=="Rechazado") {
    body.status_elaboracion ="En elaboración";
    body.status_revision ="Rechazado";
    body.status ="En elaboración";
  }else{
    body.status_elaboracion ="Elaborado";
    body.status_revision ="Aprobado";
    body.status ="Revisado";
  }
 await VD.update(body,{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
        const notificacion = {
          titulo: `Revisión de documento ${status}`,
          descripcion: `Se revisó el documento: ${nombre}`,
          origen: "",
          modulo: `gestion-versiones/${id}`,
          icon: "ri-money-dollar-box-line",
          color: "avatar-title bg-success rounded-circle font-size-16",
          uid: req.body.elabora_v_id,
          rid: req.userId,
        };
        CrearNotificacion(notificacion);
        if (req.body.status_revision==="Aprobado") {
          const notificacion = {
            titulo: `Tienes un documento pendiente por aprobar `,
            descripcion: `Se revisó el documento : ${nombre} ,y esta listo para ser aprobado`,
            origen: "",
            modulo: `gestion-versiones/${id}`,
            icon: "ri-money-dollar-box-line",
            color: "avatar-title bg-success rounded-circle font-size-16",
            uid: req.body.aprueba_v_id,
            rid: req.userId,
          };
          CrearNotificacion(notificacion);
        }
      } else {
        res.send({
          message: `No puede editar!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar"
      });
    });
};


// Update a Book by the id in the request
exports.aprobar = async (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const status = req.body.status_aprobacion;
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.firma_aprueba= `https://naunapp.herokuapp.com/public/${filename}`;  
    body.archivo= `https://naunapp.herokuapp.com/public/${filename}`; 
  } 
  body.observaciones_aprobacion      =  req.body.observaciones_aprobacion;
  body.status_aprobacion           =  req.body.status_aprobacion;
 await VD.update(body,{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
        const notificacionuno = {
          titulo: `Aprobación del documento ${status},  (${nombre})`,
          descripcion: `Se revisó un documento`,
          origen: "",
          modulo: `gestion-versiones/${id}`,
          icon: "ri-money-dollar-box-line",
          color: "avatar-title bg-success rounded-circle font-size-16",
          uid: req.body.revisa_v_id,
          rid: req.userId,
        };
        CrearNotificacion(notificacionuno);
        const notificaciondos = {
          titulo: `Aprobación de documento ${status}, (${nombre})`,
          descripcion: `Se revisó un documento`,
          origen: "",
          modulo: `gestion-versiones/${id}`,
          icon: "ri-money-dollar-box-line",
          color: "avatar-title bg-success rounded-circle font-size-16",
          uid: req.body.elabora_v_id,
          rid: req.userId,
        };
        CrearNotificacion(notificaciondos);
      } else {
        res.send({
          message: `No puede editar!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar"
      });
    });
};


// Update a Book by the id in the request
exports.habilitar = async (req, res) => {
  const id = req.body.documento_id;
  const body={};
    body.archivo=req.body.archivo;
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
    body.aprueba_v_id= req.body.aprueba_v_id;
    body.revisa_v_id= req.body.revisa_v_id;
    body.proceso_v_id= req.body.proceso_v_id;
    body.tipo_id= req.body.tipo_id;
    body.status= "Habilitado";

 await Documento.update(body,{
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
        const notificacionuno = {
          titulo: `Documento habilitado`,
          descripcion: `Se habilitó un documento`,
          origen: "",
          modulo: `gestion-versiones/${id}`,
          icon: "ri-money-dollar-box-line",
          color: "avatar-title bg-success rounded-circle font-size-16",
          uid: req.body.elabora_v_id,
          rid: req.userId,
        };
        CrearNotificacion(notificacionuno);
        const notificaciondos = {
          titulo: `Documento habilitado`,
          descripcion: `Se habilitó un documento`,
          origen: "",
          modulo: `gestion-versiones/${id}`,
          icon: "ri-money-dollar-box-line",
          color: "avatar-title bg-success rounded-circle font-size-16",
          uid: req.body.revisa_v_id,
          rid: req.userId,
        };
        CrearNotificacion(notificaciondos);
        const notificaciontres = {
          titulo: `Documento habilitado`,
          descripcion: `Se habilitó un documento`,
          origen: "",
          modulo: `gestion-versiones/${id}`,
          icon: "ri-money-dollar-box-line",
          color: "avatar-title bg-success rounded-circle font-size-16",
          uid: req.body.aprueba_v_id,
          rid: req.userId,
        };
        CrearNotificacion(notificaciontres);
      } else {
        res.send({
          message: `No puede editar!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar editar"
      });
    });
};