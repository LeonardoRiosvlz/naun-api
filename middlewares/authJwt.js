import jwt from 'jsonwebtoken';
const config = require("../config/config.js");
const db = require("../models");
const User = db.user;
const Permiso = db.permiso;
const Conversacion = db.conversacion;

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.auth.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Token expirado"
      });
    }

    req.userId = decoded.id;

    next();
  });
};

const isCoordinadorPrivilegiado = (req, res, next) => {
  Permiso.findAndCountAll({
    where: { 
      uid: req.userId,
      eid: req.body.eid
     }
  }).then(data => {
      if (data.count> 0) {
        next();
        return;
      } else {
        return res.status(401).send({
          message: "No tienes permiso para esto"
        });
      }
    })
};


const isAdmin =async (req, res, next) => {
await  User.findByPk(req.userId).then(user => {
    if (user.tipo==="Master") {
      next();
      return;
    }
    res.status(403).send({
      message: "Requiere rol Super administrador"
    });
    return;
  });
};
const isTecnico = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.lenth; i++) {
        if (roles[i].name === "tecnico") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Tecnico Role!"
      });
      return;
    });
  });
};
const isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "coordinador") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Rol Coordinador!"
      });
    });
  });
};

const isModeratorOrAdmin = async (req, res, next) => {
    await  User.findByPk(req.userId).then(user => {
        if (user.tipo==="Master"||user.tipo==="Cliente") {
          next();
          return;
        }
        res.status(403).send({
          message: "Requiere rol Super administrador o cliente"
        });
        return;
      });
    };

const isAdminSala = (req, res, next) => {
  console.log(req.body.id_conversacion); 
 Conversacion.findAndCountAll({
    where: {
      uid: req.userId,
      id:req.body.id_conversacion
    },
    offset: 10,
    limit: 1
  }).then(data => {
    if (data.count<1) {
      res.status(403).send({
        message: "No eres dueño de esta sala!"
      });
    }else{
      next();
      return;
    }
  })
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isTecnico: isTecnico,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  isAdminSala: isAdminSala,
  isCoordinadorPrivilegiado: isCoordinadorPrivilegiado
};

module.exports = authJwt;
