import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/mejoras.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])



    // Create a new cargo
    router.post("/mejoras/listar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.listarAdmin);

    // Create a new cargo
    router.post("/mejoras",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.create);
  
    // Retrieve all cargos
    router.get("/mejoras",authJwt.verifyToken, Controller.findAll);

     // Retrieve all cargos
     router.post("/mejoras/todas",[cpUpload,authJwt.verifyToken],authJwt.verifyToken, Controller.findAll);

    // Retrieve all cargos
    router.post("/mejoras/find",[cpUpload,authJwt.verifyToken],authJwt.verifyToken, Controller.find);

    // Update a cargo with id
    router.put("/mejoras",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.update);
  
    // Delete a cargo with id
    router.post("/mejoras/delete",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.delete);

  
    module.exports = router;
  