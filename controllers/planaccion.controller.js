const db = require("../models");
const Plan = db.planaccion;
const Accion = db.acciones;
const Base = db.basesae;
const Periodo = db.periodo;
const Mejoras = db.mejoras;
const User = db.user;
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
  const data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    cliente_id: req.body.cliente_id,
    base_id: req.body.base_id,
    clasificacion_id: req.body.clasificacion_id,
  };
  // Save
 await Plan.create(data)
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
  Plan.findAll({
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
    console.log(req.body);
  const id = req.userId;
 await Plan.findAll({
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
        model:Base,
        include: [
          {
            model:Periodo
          }
        ],
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



exports.findPlan = async (req, res) => {
  const id =  req.body.id;
  console.log(id);
 await Plan.findOne({
    offset: 0,
    where: {
      id:id
    }, // conditions
    include: [
      {
        model:Base,
        atributes: ['id','nombre' ],
      },
      {
        model:Mejoras,
        include: [
          {
            model:Accion,
            atributes: ['id'],
          },   
        ],
      },     
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

 await Plan.update({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    base_id: req.body.base_id,
    clasificacion_id: req.body.clasificacion_id,
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
await Plan.destroy({
    where: { id: id }
  })
    .then(num => {
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
