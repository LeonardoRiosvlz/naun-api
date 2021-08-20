import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/avancesae.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([
    { name: 'filename', maxCount: 1 },
    { name: 'gallery', maxCount: 18 },
    ])

 

    // Create a new cargo
    router.post("/avancesae/listar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.listarAdmin);

    // Create a new cargo
    router.post("/avancesae",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.create);
  
    // Retrieve all cargos
    router.get("/avancesae",authJwt.verifyToken, Controller.findAll);
 
    // Retrieve all cargos
    router.post("/avancesae/find",[cpUpload,authJwt.verifyToken],authJwt.verifyToken, Controller.findBase);

    // Update a cargo with id
    router.put("/avancesae",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.update);
  
    // Delete a cargo with id
    router.post("/avancesae/delete",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.delete);

  
    module.exports = router;
  