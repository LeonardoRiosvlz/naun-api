const bcrypt = require("bcrypt");
const db = require("../models");
const Sedes = db.sedes;
const User = db.user;
const Op = db.Op;

// Create and Save a new Book
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.cliente_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Book
  const body={};
  body.nombre=req.body.nombre
  body.departamento=req.body.departamento
  body.codigo_departamento=req.body.codigo_departamento
  body.municipio=req.body.municipio
  body.codigo_municipio=req.body.codigo_municipio
  body.codigo_sede=req.body.codigo_sede
  body.sede_principal=req.body.sede_principal
  body.numero_sede=req.body.numero_sede
  body.zona=req.body.zona
  body.nombre_gerente= req.body.nombre_gerente
  body.direccion=req.body.direccion
  body.barrio=req.body.barrio
  body.centro_poblado=   req.body.centro_poblado    
  body.fax=req.body.fax
  body.telefono=req.body.telefono
  body.email=req.body.email
  body.nombre_contacto=req.body.nombre_contacto
  body.cargo=req.body.cargo
  body.telefono_contacto= req.body.telefono_contacto
  body.celular_persona= req.body.celular_persona
  body.celular_corporativo=req.body.celular_corporativo
  body.email_cotacto=req.body.email_cotacto
  body.status= req.body.status
  body.cliente_id= req.body.cliente_id
  // Save Book in database
 await Sedes.create(body)
    .then(data => {
      res.send(data);
      body.user_id= data.id;
      CrearCliente(body);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book."
      });
    }); 
};


exports.findAll = async (req, res) => {
    await  Sedes.findAndCountAll({
        limit: 3000000,
        offset: 0,
        where: { }, // conditions
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
      await  Sedes.findAndCountAll({
          limit: 3000000,
          offset: 0,
          where: { cliente_id :req.body.cliente_id  }, // conditions
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
    const body={};
    body.nombre=req.body.nombre
    body.departamento=req.body.departamento
    body.codigo_departamento=req.body.codigo_departamento
    body.municipio=req.body.municipio
    body.codigo_municipio=req.body.codigo_municipio
    body.codigo_sede=req.body.codigo_sede
    body.sede_principal=req.body.sede_principal
    body.numero_sede=req.body.numero_sede
    body.zona=req.body.zona
    body.nombre_gerente= req.body.nombre_gerente
    body.direccion=req.body.direccion
    body.barrio=req.body.barrio
    body.centro_poblado=   req.body.centro_poblado    
    body.fax=req.body.fax
    body.telefono=req.body.telefono
    body.email=req.body.email
    body.nombre_contacto=req.body.nombre_contacto
    body.cargo=req.body.cargo
    body.telefono_contacto= req.body.telefono_contacto
    body.celular_persona= req.body.celular_persona
    body.celular_corporativo=req.body.celular_corporativo
    body.email_cotacto=req.body.email_cotacto
    body.status= req.body.status
    body.cliente_id= req.body.cliente_id

    await Sedes.update(body,{
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
exports.delete = async (req, res) => {
  const id = req.body.id;
 await Sedes.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cliente borrado satisfactoriamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar el lciente con el id=${id}. Tal vez el  no existe!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar el cliente con el id=" + id
      });
    });
};

