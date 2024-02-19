const users = require('../data/users.json');

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
       
    },

  
};

module.exports = controller