import express from 'express'; 
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/itemsautoevaluacion.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])



    // Create a new cargo
    router.post("/autoevaluacion/cuantitativa/items/listar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.listarAdmin);

    // Create a new cargo
    router.post("/autoevaluacion/cuantitativa/items",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.create);
  
    // Retrieve all cargos
    router.get("/autoevaluacion/cuantitativa/items",authJwt.verifyToken, Controller.findAll);

    // Retrieve all cargos
    router.post("/autoevaluacion/cuantitativa/items/find",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.findPlan);

    // Update a cargo with id
    router.put("/autoevaluacion/cuantitativa/items",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.update);
  
    // Delete a cargo with id
    router.post("/autoevaluacion/cuantitativa/items/delete",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.delete);

  
    module.exports = router;
  