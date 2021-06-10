const bcrypt = require("bcrypt");
const { perfiles } = require("../models");
const db = require("../models");
const Perfil = db.perfiles;
const User = db.user;
const Cargos = db.cargos;
const Op = db.Op;

// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const body={};
  if(req.files['filename']){
    const { filename } = req.files['filename'][0]
    body.imagen= `https://naun.herokuapp.com/public/${filename}`;  
  }
  body.cliente_id= req.body.cliente_id;
  body.nombre= req.body.nombre;
  body.tipo= req.body.tipo;
  body.cedula= req.body.cedula;
  body.telefono= req.body.telefono;
  body.email= req.body.email;
  body.celular_personal= req.body.celular_personal;
  body.celular_corporativo= req.body.celular_corporativo;
  body.status= req.body.status;
  // Save Book in database
 await User.create({
     nombre:body.nombre,
     status:"activo",
     tipo:"Usuario",
     imagen:body.foto,
     email:body.email,
     password: bcrypt.hashSync(req.body.password, 8)
 }).then(data => {
      res.send(data);
      body.user_id= data.id;
      CrearPerfil(body);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
    }); 
};


async function CrearPerfil(body){
  // Save
  await  Perfil.create(body)
  .then( data => {
  })
  .catch(err => {
    return;
  });
}



exports.findAll = async (req, res) => {
    await  Perfil.findAll({
        limit: 3000000,
        offset: 0,
        where: { 
           cliente_id: req.body.cliente_id
        },
        include: [  
          {
            model:User,
            attributes:['id','imagen','status'],
            include: [  
              {
                model:Cargos,
              },
            ]
          }
        ],
        attributes:['id','nombre'], // conditions
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
      await  Perfil.findAndCountAll({
          limit: 3000000,
          offset: 0,
          where: { 
            cliente_id: req.body.cliente_id,
            tipo:req.body.tipo
          },
          include: [  
            {
              model:User,
              attributes:['id','status','imagen'],
              include: [  
                {
                  model:Cargos,
                },
              ]
            },

          ], // conditions
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
  const id = req.params.id;

 await Abonos.findByPk(id)
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
    const body={};

    body.nombre= req.body.nombre;
    body.tipo= req.body.tipo;
    body.cedula= req.body.cedula;
    body.telefono= req.body.telefono;
    body.celular_personal= req.body.celular_personal;
    body.celular_corporativo= req.body.celular_corporativo;
    body.status= req.body.status;
    const per={};
    per.nombre=req.body.nombre;
    per.status=req.body.status;
    if (req.body.password) {
      per.password= bcrypt.hashSync(req.body.password, 8)
    }
    if(req.files['filename']){
      const { filename } = req.files['filename'][0]
      per.imagen= `https://naun.herokuapp.com/public/${filename}`;  
    }
    await Perfil.update(body,{
        where: { id: req.body.id }
      })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
        User.update(per,{
            where: { id: req.body.user_id }
          })
      } else {
        res.send({
          message: `No puede editar el perfil con  el =${id}. Tal vez el  no existe o la peticion es vacia!`
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
 await Perfil.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cliente borrado satisfactoriamente!"
        });
        User.destroy({
            where: { id: req.body.user_id }
          })
      } else {
        res.send({
          message: `No se pudo borrar con el id=${id}. Tal vez el  no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar el cliente con el id=" + id
      });
    });
};

