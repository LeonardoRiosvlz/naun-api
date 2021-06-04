import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/normatividad.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])



  
    // Create a new cargo
    router.post("/normatividad",[cpUpload,authJwt.verifyToken], Controller.create);
  
    // Create a new cargo
    router.post("/normatividad/listar",[cpUpload,authJwt.verifyToken], Controller.listarAdmin);
  

    // Retrieve all cargos
    router.get("/normatividad",authJwt.verifyToken, Controller.findAll);
  
    // Update a cargo with id
    router.put("/normatividad",[cpUpload,authJwt.verifyToken], Controller.update);
  
    // Delete a cargo with id
    router.post("/normatividad/delete",[cpUpload,authJwt.verifyToken], Controller.delete);

  
    module.exports = router;