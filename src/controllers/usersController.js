
const users = require('../data/users.json');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Leer JSON
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const usersFS = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const controller = {
    mostrarUsers : (req, res) => {
        return res.render('users/usersList.ejs', {users})
    },
    
    loginUser : (req, res) => {
        return res.render('users/login.ejs')
    },  

    createUser : (req, res) => {
        return res.render('users/userRegister.ejs');
    },

    saveNewUser : (req, res) => {
        // Validaciones
        let errors = validationResult(req);
        if (errors.isEmpty())
        {        


            //Preguntar si existe el file que genera multer con la información de los archivos cargados en el formulario para validar que se haya subido la imagen
            if (req.file)
            {
                // Filtrar lo que se quiere capturar del req.body
                let newUser = {
                id: users.length + 1,
                first_name: req.body.nombre_user,
                last_name: req.body.apellido_user,
                email: req.body.email_user,
                password: bcrypt.hashSync(req.body.password_user, 10),
                // Extraer del file, el nombre que recibe el archivo por parte de multer
                avatar: req.file.filename,
                type: req.body.user_type,
            };
        
            // Agregar a lo leido en el JSON lo que se capturo del req.body
            usersFS.push(newUser);
        
            // Convertir en JSON
            let newUsersJSON = JSON.stringify(usersFS);
            
            // Escribir en el JSON
            fs.writeFileSync(usersFilePath, newUsersJSON);
        
            // Redireccionar solo después de una escritura exitosa
            res.redirect('/users');
            }
            else
            {
                res.send('Debes cargar una imagen de avatar');
            }
            
        } 
        else
        {
            res.render('users/userRegister.ejs', { errors: errors.array(), anterior: req.body});
        }
       
    },

  
};

module.exports = controller