import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/eventos.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])



    // Create a new cargo
    router.post("/eventos/listar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.listarAdmin);

    // Create a new cargo
    router.post("/eventos",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.create);

    // Create a new cargo
    router.post("/eventos/find",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.findOne); 

    // Retrieve all cargos
    router.get("/eventos",authJwt.verifyToken, Controller.findAll);
  
    // Update a cargo with id
    router.put("/eventos",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.update);
  
    // Delete a cargo with id
    router.post("/eventos/delete",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.delete);

    // Create a new cargo
    router.post("/eventos/responsables/agregar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.addResponsable); 

    // Create a new cargo
    router.post("/eventos/responsables/eliminar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.deleteResponsable); 

    // Create a new cargo
    router.post("/eventos/comprometidos/agregar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.addComprometido); 
    
    // Create a new cargo
    router.post("/eventos/comprometidos/eliminar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.deleteComprometido); 

  
    module.exports = router;
  