import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


    const notificacionController = require("../controllers/notificacion.controller.js");
    // Create a new cargo
    router.post("/notificacion",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], notificacionController.create);

    // Retrieve all cargos
    router.get("/notificacion",authJwt.verifyToken, notificacionController.findAllPendiente);

    // Retrieve all cargos
    router.get("/notificacion/todas",authJwt.verifyToken, notificacionController.findAll);

    // Update a cargo with id
    router.put("/notificacion",[cpUpload,authJwt.verifyToken], notificacionController.update);

    
    // Delete a cargo with id
    router.post("/notificacion/delete",[cpUpload,authJwt.verifyToken], notificacionController.delete);


    module.exports = router;
