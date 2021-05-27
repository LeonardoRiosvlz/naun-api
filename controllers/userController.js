'use strict'
import User from '../models/user';
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function signUp (req, res) {

    const body = {
      nombre: req.body.nombre,
      email: req.body.email,
      role: req.body.role
    }
  
    body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
  
    try {
  
      const userDB = await User.create(body);
  
      return res.json(userDB);
      
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Ocurrio un error',
        error
      });
    }
  
  }


  module.exports = {
    signUp
  }