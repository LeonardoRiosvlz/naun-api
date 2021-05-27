const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const upload = require('../libs/storage');
const cpUpload = upload.fields([{ name: 'filename', maxCount: 1 }])


module.exports = app => {
    const Controller = require("../controllers/clientes.controller.js");
  
    const router = require("express").Router();
  
    // Create a new cargo
    router.post("/",[cpUpload,authJwt.verifyToken,authJwt.isAdmin,verifySignUp.checkDuplicateUsernameOrEmail], Controller.create);
  
    // Retrieve all cargos
    router.get("/",authJwt.verifyToken, Controller.findAll);
  
    // Update a cargo with id
    router.put("/",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], Controller.update);
  
    // Delete a cargo with id
    router.post("/delete",[cpUpload,authJwt.verifyToken, authJwt.isAdmin], Controller.delete);

  
    app.use("/api/clientes", router);
  };
  