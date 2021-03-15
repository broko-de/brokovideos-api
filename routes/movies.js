const express = require('express');
const MoviesService = require('../services/movies');

function moviesApi(app){
    const router = express.Router();
    //la ruta de inicio de este router usara el api/movie
    app.use('/api/movies',router);

    //CREO UNA INSTANCIA DEL SERVICIO DE PELICULA
    const moviesService = new MoviesService();
    router.get('/',async function(req,res,next){
        //obtenemos los tags desde QUERY porque son parametros pasados por
        //el formato ?param1=...&param2=....
        const { tags } = req.query;
        //USAMOS TRY/CATCH PORQUE ES CODIGO ASINCRONO
        try {
            const movies = await moviesService.getMovies({tags});

            res.status(200).json({
                data: movies,
                message: 'Listado de peliculas'
            })
        } catch (err) {
            next(err)
        }
    });
    
    //ruta para obtener una pelicula de acuerdo al ID
    router.get('/:movieId',async function(req,res,next){
        //en este caso usamos PARAMS porque lo definimos como parametro en la URL
        const {movieId} = req.params;
        //USAMOS TRY/CATCH PORQUE ES CODIGO ASINCRONO
        try {
            const movie = await moviesService.getMovie({movieId});

            res.status(200).json({
                data: movie,
                message: 'Detalle de la pelicula'
            })
        } catch (err) {
            next(err)
        }
    });

    //rutara para crear una pelicula
    router.post('/',async function(req,res,next){
        // OBTENEMOS EL CUERPO DE LA REQUEST QUE ES ENVIADO COMO JSON
        // Y LE PONES UN ALIAS : movie
        const { body: movie } = req;
        //USAMOS TRY/CATCH PORQUE ES CODIGO ASINCRONO
        try {
            const createMovieId = await moviesService.createMovie({movie});

            res.status(201).json({
                data: createMovieId,
                message: 'Pelicula creada'
            })
        } catch (err) {
            next(err)
        }
    });

    //ruta para actualizar o crear una pelicula si no existe la ID
    router.put('/:movieId',async function(req,res,next){
        const {movieId} = req.params;
        const { body: movie } = req;

        //USAMOS TRY/CATCH PORQUE ES CODIGO ASINCRONO
        try {
            const updatedMovieId = await moviesService.updateMovie({movieId,movie});

            res.status(200).json({
                data: updatedMovieId,
                message: 'Pelicula modificada'
            })
        } catch (err) {
            next(err)
        }
    });

    //ruta para eliminar un pelicula de acuerdo a un ID
    router.delete('/:movieId',async function(req,res,next){
        const {movieId} = req.params;

        //USAMOS TRY/CATCH PORQUE ES CODIGO ASINCRONO
        try {
            const deletedMovieId = await moviesService.deleteMovie({movieId});

            res.status(200).json({
                data: deletedMovieId,
                message: 'Pelicula eliminada'
            })
        } catch (err) {
            next(err)
        }
    });
}

module.exports = moviesApi;
