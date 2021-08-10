import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/formatos.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 },{ name: 'diagrama', maxCount: 1 }])



  
    // Create a new cargo
    router.post("/formatos",[cpUpload,authJwt.verifyToken], Controller.create);
  
    // Create a new cargo
    router.post("/formatos/listar",[cpUpload,authJwt.verifyToken], Controller.listarAdmin);
  
    // Create a new cargo
    router.post("/formatos/find",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.find);
    // Update a cargo with id

    router.put("/formatos/editar",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.updateDocument);
  

    // Retrieve all cargos
    router.get("/formatos",authJwt.verifyToken, Controller.findAll);
  
    // Update a cargo with id
    router.put("/formatos",[cpUpload,authJwt.verifyToken], Controller.update);
  
    // Delete a cargo with id
    router.post("/formatos/delete",[cpUpload,authJwt.verifyToken], Controller.delete);

    // Delete a cargo with id
    router.post("/formatos/filtro",[cpUpload,authJwt.verifyToken], Controller.filtro);


    module.exports = router;