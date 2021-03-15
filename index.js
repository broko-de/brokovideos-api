const express = require('express');

const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');
//MIDDLEWARES

//Body parse
//NOS PERMITE CUANDO ENVIAMOS DE DATOS JSON LOS PUEDA INTERPRETAR
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Bienvenidos al API REST de peliculas de brokode");
});

//llamamos a nuestro router de peliculas
moviesApi(app);

app.listen(config.port,()=>{
    console.log(`Servidor escuchando en http://localhost:${config.port}`);
});