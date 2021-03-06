const express = require('express');
const helmet = require('helmet');

const app = express();

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies.js');
const userMoviesApi = require('./routes/userMovies.js');

//MIDDLEWARES
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers.js');
const notFoundHandler  = require('./utils/middleware/notFoundHandler');
const { protectRoutes } = require('./utils/middleware/protectRoutes');

//Body parse
//NOS PERMITE CUANDO ENVIAMOS DE DATOS JSON LOS PUEDA INTERPRETAR
app.use(express.json());
//HACE USO DE LA CONFIGURACION POR DEFECTO DE HELMET, SI LO QUEREMOS PERSONALIZAR DEBEMOS SETEARLE LA CONFIGURACION
app.use(helmet());

app.get('/',(req,res)=>{
    res.send("Bienvenidos al API REST de peliculas de brokode");
});

//llamamos a nuestro router de peliculas - MIDDLEARE DE RUTAS
authApi(app);
moviesApi(app);
userMoviesApi(app);
//captura del error 404
app.use(notFoundHandler)
//Middle para proteger rutas
app.use(protectRoutes)

//MIDDLEWARES DE ERRORES TIENE QUE IR LUEGO DE LAS RUTAS
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port,()=>{
    console.log(`Servidor escuchando en http://localhost:${config.port}`);
});