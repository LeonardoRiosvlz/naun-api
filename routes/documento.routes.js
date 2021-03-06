import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/documentos.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 },{ name: 'diagrama', maxCount: 1 }])



  
    // Create a new cargo
    router.post("/documentos",[cpUpload,authJwt.verifyToken], Controller.create);
  
    // Create a new cargo
    router.post("/documentos/listar",[cpUpload,authJwt.verifyToken], Controller.listarAdmin);
  
    // Create a new cargo
    router.post("/documentos/find",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.find);
    // Update a cargo with id

    router.put("/documentos/editar",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.updateDocument);
  

    // Retrieve all cargos
    router.get("/documentos",authJwt.verifyToken, Controller.findAll);
  
    // Update a cargo with id
    router.put("/documentos",[cpUpload,authJwt.verifyToken], Controller.update);
  
    // Delete a cargo with id
    router.post("/documentos/delete",[cpUpload,authJwt.verifyToken], Controller.delete);

    // Delete a cargo with id
    router.post("/documentos/filtro",[cpUpload,authJwt.verifyToken], Controller.filtro);


    module.exports = router;