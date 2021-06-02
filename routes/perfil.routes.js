import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/perfil.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


    // Create a new cargo
    router.post("/perfil/listar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.listarAdmin);
  
    // Create a new cargo
    router.post("/perfil/lista",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.findAll);
  
    // Create a new cargo
    router.post("/perfil",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.create);
  
    // Retrieve all cargos
    router.get("/perfil",authJwt.verifyToken, Controller.findAll);
  
    // Update a cargo with id
    router.put("/perfil",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.update);
  
    // Delete a cargo with id
    router.post("/perfil/delete",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.delete);

  
    module.exports = router;
  