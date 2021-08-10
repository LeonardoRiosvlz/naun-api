import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const Controller = require("../controllers/vformatos.controller.js");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 },{ name: 'diagrama', maxCount: 1 }])




    // Create a new cargo
    router.post("/formatos/versiones",[cpUpload,authJwt.verifyToken], Controller.create);

    // Create a new cargo
    router.post("/formatos/versiones/find",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.findOne);

    // Create a new cargo
    router.post("/formatos/versiones/listar",[cpUpload,authJwt.verifyToken,authJwt.isModeratorOrAdmin], Controller.find);
    // Update a cargo with id

    // Update a cargo with id
    router.put("/formatos/versiones",[cpUpload,authJwt.verifyToken], Controller.update);

    // Delete a cargo with id
    router.post("/formatos/versiones/delete",[cpUpload,authJwt.verifyToken], Controller.delete);

    // Delete a cargo with id
    router.post("/formatos/versiones/elaborar",[cpUpload,authJwt.verifyToken], Controller.elaborar);

    
    // Delete a cargo with id
    router.post("/formatos/versiones/revisar",[cpUpload,authJwt.verifyToken], Controller.revisar);
        
    // Delete a cargo with id
    router.post("/formatos/versiones/aprobar",[cpUpload,authJwt.verifyToken], Controller.aprobar);
        
    // Delete a cargo with id
    router.post("/formatos/versiones/habilitar",[cpUpload,authJwt.verifyToken], Controller.habilitar);

    // Delete a cargo with id
    router.post("/formatos/versiones/editversionando",[cpUpload,authJwt.verifyToken], Controller.editarVersionando);

    // Delete a cargo with id
    router.post("/formatos/versiones/obsoleta",[cpUpload,authJwt.verifyToken], Controller.crearObsoleta);
    module.exports = router;
