import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/notificacion.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


    // Create a new cargo
    router.post("/notificacion",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], Controller.create);
  
    // Retrieve all cargos
    router.get("/notificacion",authJwt.verifyToken, Controller.findAll);
  
    // Update a cargo with id
    router.put("/notificacion",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], Controller.update);
  
    // Delete a cargo with id
    router.post("/notificacion/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], Controller.delete);
  

  
  
    module.exports = router;