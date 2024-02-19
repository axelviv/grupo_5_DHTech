const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js')

// Lista de usuarios
router.get('/', usersController.mostrarUsers);

// Login
router.get('/login', usersController.loginUser);

// Registro de usuarios
router.get('/register', usersController.createUser);
router.post('/register', usersController.saveNewUser);

module.exports = router;