const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require('../controllers/usersController.js')
const multer = require('multer');
const { body } = require('express-validator');


//Multer--------------------------------------------------------------------

const storage = multer.diskStorage({
    //Donde se guardara la imagen
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/users'))
    },
    //Nombre que tendra la imagen
    filename: (req, file, cb) => {
        const newFilename = 'avatar-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

//Para ejecutar multer con la configuración anterior, agregar upload en la ruta post 
const upload = multer({ storage: storage});

//--------------------------------------------------------------------------

// Validaciones ---------------------

const validarFormulario = [
    body('nombre_user').notEmpty().withMessage('Debes ingresar un nombre'),
    body('apellido_user').notEmpty().withMessage('Debes ingresar un apellido'),
    body('email_user').isEmail().withMessage('Debes ingresar un email valido'),
];


// Lista de usuarios
router.get('/', usersController.mostrarUsers);

// Login
router.get('/login', usersController.loginUser);

// Registro de usuarios
router.get('/register', usersController.createUser);

//Se pasa el upload creado con multer como segundo argumento, single porque es un solo archivo y dentro el name del input del formulario 
router.post('/register', upload.single('image_user'), validarFormulario, usersController.saveNewUser);

module.exports = router;