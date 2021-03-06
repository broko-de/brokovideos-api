const express = require('express');
//const passport = require('passport');
const MoviesService = require('../services/movies');

//IMPORTACION DE SCHEMAS
const {movieIdSchema, createMovieSchema, updateMovieSchema} = require('../utils/schemas/movies');
//IMPORTACION DE VALIDATIONHANDLER
const validationHandler = require('../utils/middleware/validationHandler');
//IMPORTACION DE MIDDLEWARE DE PROTECCION DE RUTAS
const { protectRoutes } = require('../utils/middleware/protectRoutes');
//IMPORTACION DE MIDDLEWARE PARA COMPROBAR SCOPES
const scopesValidationHanlder = require('../utils/middleware/scopesValidationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS} = require('../utils/times');

// PARA PROTEGER LAS RUTAS IMPORTAMOS LA ESTRATEGIA - SIN MIDDLEWARE
//require('../utils/auth/strategies/jwt');

function moviesApi(app){
    const router = express.Router();
    //la ruta de inicio de este router usara el api/movie
    app.use('/api/movies',router);

    //CREO UNA INSTANCIA DEL SERVICIO DE PELICULA
    const moviesService = new MoviesService();
    router.get('/',
        //PROTEJEMOS LAS RUTA POR MEDIO DE PASSPORT FUNCIONA COMO UN MIDDLEWARE
        //passport.authenticate('jwt',{session:false}),
        //Opcion con middleware creado
        protectRoutes,
        //Comprobamos los permisos de scope pasandole como parametro el que deberia tener
        scopesValidationHanlder(['read:movies']),
        async function(req,res,next){
            //LE PASO EL CONTROL DE CACHE
            cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
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
                //AQUI PASAMOS EL ERROR AL MIDDLEWARE DE ERRORES QUE CREAMOS O BIEN AL QUE TENGA POR DEFECTO EXPRESS
                next(err)
            }
        }
    );
    
    /*
        Ruta para obtener una pelicula de acuerdo al ID
        Al aplicar validacion con JOI pasamos como 2do parametros el handler de validacion
        y especificamos que sacaremos el movieId de los parametros del request
    */
    router.get('/:movieId',
        protectRoutes,        
        scopesValidationHanlder(['read:movies']),
        validationHandler({movieId:movieIdSchema},'params'),
        async function(req,res,next){
            //LE PASO EL CONTROL DE CACHE
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
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
        }
    );

    /*
        ruta para crear una pelicula
        Agregamos la validacion en el segundo parametro(middleware), no es necesario especificar de donde obtener el eschema
        Lo toma por defecto del body
    */
    router.post('/',
        protectRoutes,
        scopesValidationHanlder(['create:movies']),
        validationHandler(createMovieSchema),
        async function(req,res,next){
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
        }
    );

    //ruta para actualizar o crear una pelicula si no existe la ID
    router.put('/:movieId',
        protectRoutes,
        scopesValidationHanlder(['update:movies']),
        validationHandler({movieId:movieIdSchema},'params'),
        validationHandler(updateMovieSchema),
        async function(req,res,next){
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
        }
    );

    //ruta para eliminar un pelicula de acuerdo a un ID
    router.delete('/:movieId',
        protectRoutes,
        scopesValidationHanlder(['delete:movies']),
        validationHandler({movieId:movieIdSchema},'params'),
        async function(req,res,next){
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
        }
    );
}

module.exports = moviesApi;
