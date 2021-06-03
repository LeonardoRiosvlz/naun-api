import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/tipoProcesos.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])



  
    // Create a new cargo
    router.post("/tipo_procesos",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.create);
  
    // Create a new cargo
    router.post("/tipo_procesos/listar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.listarAdmin);

    // Create a new cargo
    router.post("/tipo_procesos/find",[cpUpload,authJwt.verifyToken], Controller.find);

    // Retrieve all cargos
    router.get("/tipo_procesos",authJwt.verifyToken, Controller.findAll);
  
    // Update a cargo with id
    router.put("/tipo_procesos",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.update);
  
    // Delete a cargo with id
    router.post("/tipo_procesos/delete",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.delete);

  
    module.exports = router;
  