import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/subgrupoestandares.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])



  
    // Create a new cargo
    router.post("/estandares/subgrupos",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.create);
  
    // Create a new cargo
    router.get("/estandares/subgrupos/listar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.listarAdmin);

    // Create a new cargo
    router.post("/estandares/subgrupos/find",[cpUpload,authJwt.verifyToken], Controller.find);

    // Retrieve all cargos
    router.get("/estandares/subgrupos",authJwt.verifyToken, Controller.findAll);
  
    // Update a cargo with id
    router.put("/estandares/subgrupos",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.update);
  
    // Delete a cargo with id
    router.post("/estandares/subgrupos/delete",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.delete);
 
  
    module.exports = router;
  