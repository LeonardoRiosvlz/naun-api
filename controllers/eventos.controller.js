const db = require("../models");
const Eventos = db.eventos;
const Clasificacion = db.clasificacioneventos;
const User = db.user;
const Comprometido = db.comprometidos;
const Responsables = db.responsables;
const Cargo = db.cargos;
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
  
  body.id=req.body.id;
  body.nombre=req.body.nombre;
  body.descripcion=req.body.descripcion;
  body.observaciones=req.body.observaciones;
  body.lugar=req.body.lugar;
  body.invitados_externos=req.body.invitados_externos;
  body.periodo=req.body.periodo;
  body.fecha_programada=req.body.fecha_programada;
  body.cliente_id=req.body.cliente_id;
  body.clasificacion_id=req.body.clasificacion_id;
  // Save
 await Eventos.create(body)
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


exports.addResponsable = async (req, res) => {
  // Validate request
  if (!req.body.cargo_id) {
    res.status(400).send({
      message: "No puede ser vacio!"
    });
    return;
  }
  // Create 
  const body = {};
  body.evento_id=req.body.evento_id;
  body.cargo_id=req.body.cargo_id;
  // Save
 await Responsables.create(body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "ocurrio un problema"
      });
      return;
    });
};

// Delete a Book with the specified id in the request
exports.deleteResponsable = (req, res) => {
  const id = req.body.id;
  Responsables.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "borrado satisfactoriamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar tal vez no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar"
      });
    });
};


exports.addComprometido = async (req, res) => {
  // Validate request
  if (!req.body.cargo_id) {
    res.status(400).send({
      message: "No puede ser vacio!"
    });
    return;
  }
  // Create 
  const body = {};
  body.evento_id=req.body.evento_id;
  body.cargo_id=req.body.cargo_id;
  // Save
 await Comprometido.create(body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "ocurrio un problema"
      });
      return;
    });
};

// Delete a Book with the specified id in the request
exports.deleteComprometido = (req, res) => {
  const id = req.body.id;
  Comprometido.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "borrado satisfactoriamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar tal vez no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar"
      });
    });
};


exports.findAll = async (req, res) => {
  const id = req.userId;
 await Eventos.findAll({
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
 await Eventos.findAll({
    limit: 3000000,
    offset: 0,
    where: {
      cliente_id: req.body.cliente_id
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
exports.findOne = async (req, res) => {
  const id = req.body.id;
await  Eventos.findOne({
  limit: 3000000,
  offset: 0,
  where: {
    id:req.body.id
  }, // conditions
  include: [  
      {
        model:Comprometido,
        include: [  
          {
            model:Cargo,
            include: [  
              {
                model:User,
                attributes:['nombre','imagen']
              },
            ]
          },
        ]
      },
      {
        model:Responsables,
        include: [  
          {
            model:Cargo,
            include: [  
              {
                model:User,
                attributes:['nombre','imagen']
              },
            ]
          },
        ]
      },
    ],
  order: [
    ['id', 'DESC'],
  ],
}).then(data => {
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
  body.id=req.body.id;
  body.nombre=req.body.nombre;
  body.descripcion=req.body.descripcion;
  body.observaciones=req.body.observaciones;
  body.lugar=req.body.lugar;
  body.invitados_externos=req.body.invitados_externos;
  body.periodo=req.body.periodo;
  body.fecha_programada=req.body.fecha_programada;
  body.cliente_id=req.body.cliente_id;
  body.clasificacion_id=req.body.clasificacion_id;
await  Eventos.update(body,{
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
  const id = req.body.id;
  Eventos.destroy({
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



exports.calendario_admin = async (req, res) => {

  await  Eventos.findAll({
      limit: 3000000,
      offset: 0,
      where: {cliente_id:req.body.cliente_id}, // conditions
      order: [
        ['id', 'DESC'],
      ],
      attributes:['id',['fecha_programada', 'end'],['nombre', 'title'],['fecha_programada', 'start'],'status'],
      include: [  
        {
          model:Clasificacion,
          attributes:[['color', 'eventColor']]
        },
      ]
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
  
  
exports.calendario_find = async (req, res) => {

  await  Eventos.findAll({
      limit: 3000000,
      offset: 0,
      where: {
        cliente_id:req.body.cliente_id,
        clasificacion_id:req.body.clasificacion_id
      }, // conditions
      order: [
        ['id', 'DESC'],
      ],
      attributes:['id',['fecha_programada', 'end'],['nombre', 'title'],['fecha_programada', 'start'],'status'],
      include: [  
        {
          model:Clasificacion,
          attributes:[['color', 'eventColor']]
        },
      ]
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
  