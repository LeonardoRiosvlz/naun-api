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
    router.post("/mejoras/todas",[cpUpload,authJwt.verifyToken],authJwt.verifyToken, Controller.findAll);

    // todas para el dasboard
    router.post("/mejoras/libres",[cpUpload,authJwt.verifyToken],authJwt.verifyToken, Controller.findAllLibres);

    // Retrieve all cargos
    router.post("/mejoras/find",[cpUpload,authJwt.verifyToken],authJwt.verifyToken, Controller.find);

    // Retrieve all cargos
    router.post("/mejoras/adjuntar",[cpUpload,authJwt.verifyToken],authJwt.verifyToken, Controller.adjuntar);

    // Retrieve all cargos
    router.post("/mejoras/adjuntarrango",[cpUpload,authJwt.verifyToken],authJwt.verifyToken, Controller.adjuntarRango);

    // Retrieve all cargos
    router.post("/mejoras/desvincular",[cpUpload,authJwt.verifyToken],authJwt.verifyToken, Controller.desvincular);

    // Retrieve all cargos
    router.post("/mejoras/filtrar",[cpUpload,authJwt.verifyToken],authJwt.verifyToken, Controller.filtrar);

    // Retrieve all cargos
    router.post("/mejoras/filtrarPeriodo",[cpUpload,authJwt.verifyToken],authJwt.verifyToken, Controller.filtrarPeriodo);

    // Update a cargo with id
    router.put("/mejoras",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.update);
  
    // Delete a cargo with id
    router.post("/mejoras/delete",[cpUpload,authJwt.verifyToken, authJwt.isModeratorOrAdmin], Controller.delete);

  
    module.exports = router;
  