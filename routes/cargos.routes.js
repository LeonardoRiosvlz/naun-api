import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/cargo.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])



    // Create a new cargo
    router.post("/cargos/listar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.listarAdmin);

    // Create a new cargo
    router.post("/cargos",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.create);
  
    // Retrieve all cargos
    router.get("/cargos",authJwt.verifyToken, Controller.findAll);
  
    // Update a cargo with id
    router.put("/cargos",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.update);
  
    // Delete a cargo with id
    router.post("/cargos/delete",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.delete);

  
    module.exports = router;
  