const express = require('express');
const path = require('node:path');
const app = express();
const PORT = process.env.PORT ?? 3030;
app.listen(PORT, err =>{
    console.log(err? err : `Servidor Iniciado en http://localhost:${PORT}`);
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/* Establecemos la carpeta public */
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

/* Configuraciones para capturar POST en objeto literal y transformalo a json */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Para poder usar PUT y DELETE */
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

/* Llamamos al archivo de ruotes correspondiente */
const rutaIndex = require('./routers/indexRouter.js');
const rutaProducts = require('./routers/productsRouter.js');
const rutaUsers = require('./routers/usersRouter.js');
const { log } = require('node:console');

/* Link con app.use a la variable registerRouter */


app.use('/', rutaIndex);
app.use('/products', rutaProducts);
app.use('/users', rutaUsers);

app.use((req, res, next) => {
    res.status(404).render('notFound')
});