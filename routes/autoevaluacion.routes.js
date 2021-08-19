import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/autoevaluacion.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([
    { name: 'filename', maxCount: 1 },
    { name: 'gallery', maxCount: 18 },
    ])

 


    // Create a new cargo
    router.post("/autoevaluacion/listar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.listarAdmin);

    // Create a new cargo
    router.post("/autoevaluacion",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.create);
  
    // Retrieve all cargos
    router.get("/autoevaluacion",authJwt.verifyToken, Controller.findAll);

    // Retrieve all cargos
    router.post("/autoevaluacion/find",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin],authJwt.verifyToken, Controller.find);

    // Update a cargo with id
    router.put("/autoevaluacion",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.update);
  
    // Delete a cargo with id
    router.post("/autoevaluacion/delete",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.delete);

  
    module.exports = router;
  