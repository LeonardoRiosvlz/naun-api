const bcrypt = require("bcrypt");
const db = require("../models");
const Clientes = db.cliente;
const User = db.user;
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
    body.logo= `https://naun.herokuapp.com/public/${filename}`;  
  }
  body.tipo_cliente= req.body.tipo_cliente;
  body.tipo_documento= req.body.tipo_documento;
  body.numero_documento= req.body.numero_documento;
  body.departamento= req.body.departamento;
  body.codigo_departamento= req.body.codigo_departamento;
  body.municipio= req.body.municipio;
  body.codigo_municipio= req.body.codigo_municipio;
  body.naturaleza_juridica= req.body.naturaleza_juridica;
  body.nombre_prestador= req.body.nombre_prestador;
  body.codigo_prestador= req.body.codigo_prestador;
  body.codigo= req.body.codigo;
  body.clase_prestador= req.body.clase_prestador;
  body.ese= req.body.ese;
  body.direccion= req.body.direccion;
  body.telefono= req.body.telefono;
  body.fax= req.body.fax;
  body.celular= req.body.celular;
  body.email= req.body.email;
  body.razon_social= req.body.razon_social;
  body.representante_legal= req.body.representante_legal;
  body.numero_sede= req.body.numero_sede;
  body.nivel_atencion= req.body.nivel_atencion;
  body.caracter_territorial= req.body.caracter_territorial;
  body.nombre_contacto= req.body.nombre_contacto;
  body.cargo_contacto= req.body.cargo_contacto;
  body.telefono_contacto= req.body.telefono_contacto;
  body.celular_contacto= req.body.celular_contacto;
  body.email_contacto= req.body.email_contacto;
  // Save Book in database
 await User.create({
     nombre:body.nombre_prestador,
     status:"activo",
     tipo:"Cliente",
     imagen:body.logo,
     email:body.email,
     password: bcrypt.hashSync(req.body.email, 8)
 })
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


async function CrearCliente(body){
  // Save
  await  Clientes.create(body)
  .then( data => {
  })
  .catch(err => {
    return;
  });
}

exports.findFormato = async (req, res) => {
const id =req.body.id;
await  Abonos.findAll({
    limit: 3000000,
    offset: 0,
    where: {formato_id: id}, // conditions
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


exports.findAll = async (req, res) => {
    await  Clientes.findAndCountAll({
        limit: 3000000,
        offset: 0,
        where: { }, // conditions
        include: [  
          {
            model:User,
            attributes:['status','imagen']
          }
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
    if(req.files['filename']){
      const { filename } = req.files['filename'][0]
      body.logo= `https://naun.herokuapp.com/public/${filename}`;  
    }
    body.tipo_cliente= req.body.tipo_cliente;
    body.tipo_documento= req.body.tipo_documento;
    body.numero_documento= req.body.numero_documento;
    body.departamento= req.body.departamento;
    body.codigo_departamento= req.body.codigo_departamento;
    body.municipio= req.body.municipio;
    body.codigo_municipio= req.body.codigo_municipio;
    body.naturaleza_juridica= req.body.naturaleza_juridica;
    body.nombre_prestador= req.body.nombre_prestador;
    body.codigo_prestador= req.body.codigo_prestador;
    body.codigo= req.body.codigo;
    body.clase_prestador= req.body.clase_prestador;
    body.ese= req.body.ese;
    body.direccion= req.body.direccion;
    body.telefono= req.body.telefono;
    body.fax= req.body.fax;
    body.celular= req.body.celular;
    body.email= req.body.email;
    body.razon_social= req.body.razon_social;
    body.representante_legal= req.body.representante_legal;
    body.numero_sede= req.body.numero_sede;
    body.nivel_atencion= req.body.nivel_atencion;
    body.caracter_territorial= req.body.caracter_territorial;
    body.nombre_contacto= req.body.nombre_contacto;
    body.cargo_contacto= req.body.cargo_contacto;
    body.telefono_contacto= req.body.telefono_contacto;
    body.celular_contacto= req.body.celular_contacto;
    body.email_contacto= req.body.email_contacto;
    body.user_id= req.body.user_id;

    await Clientes.update(body,{
        where: { id: req.body.id }
      })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "editado satisfactoriamente."
        });
        User.update({
            nombre:req.body.nombre_prestador,
            status:req.body.status
         },{
            where: { id: req.body.user_id }
          })
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
 await Clientes.destroy({
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

