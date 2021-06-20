import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/plantillas.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])



    // Create a new cargo
    router.post("/plantillas/listar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.listarAdmin);

    // Create a new cargo
    router.post("/plantillas",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.create);

    // Create a new cargo
    router.post("/plantillas/find",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.find);

    // Retrieve all cargos
    router.get("/plantillas",authJwt.verifyToken, Controller.findAll);
  
    // Update a cargo with id
    router.put("/plantillas",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.update);
 
    // Update a cargo with id
    router.put("/plantillas/editar",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.updateDocument);
  
    // Delete a cargo with id
    router.post("/plantillas/delete",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.delete);

  
    module.exports = router;
  