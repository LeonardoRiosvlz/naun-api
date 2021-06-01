import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/areas.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])



    // Create a new cargo
    router.post("/areas/listar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.listarAdmin);

    // Create a new cargo
    router.post("/areas",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.create);
  
    // Retrieve all cargos
    router.get("/areas",authJwt.verifyToken, Controller.findAll);
  
    // Update a cargo with id
    router.put("/areas",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.update);
  
    // Delete a cargo with id
    router.post("/areas/delete",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.delete);

  
    module.exports = router;
  