import express from 'express';
const router = express.Router();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 },{ name: 'firma', maxCount: 1 }])

  // Retrieve all Books
  router.get("/user/all",[authJwt.verifyToken], controller.findAll);

  router.get("/api/user/contactos",[authJwt.verifyToken], controller.findAllContacto);

  router.get("/user/coordinadores",[authJwt.verifyToken], controller.findCoordinadores);
  
  router.get("/user/pefil",[authJwt.verifyToken], controller.findOne);

  router.post("/api/user/tecnico",[cpUpload,authJwt.verifyToken], controller.findTecnico);

  router.post("/api/user/regional",[cpUpload,authJwt.verifyToken], controller.findregional);

  router.get("/api/user/adminstrador",[cpUpload,authJwt.verifyToken], controller.findAdministrador);
  
  router.put("/user/pefil",[cpUpload ,authJwt.verifyToken], controller.update);

  router.put("/api/user/canal",[cpUpload ,authJwt.verifyToken], controller.updateCanal);
  
  router.get("/api/test/all", controller.allAccess);

  router.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  module.exports = router;