const express = require('express');

const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');

const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMovieSchema, userMovieIdSchema } = require('../utils/schemas/userMovies');

function userMovieApi(app) {

    const router = express.Router();

    app.use('/api/user-movies',router);

    const userMoviesServices = new UserMoviesService();

    router.get('/',validationHandler({userId:userIdSchema},'query'), async function(req,res,next){
        const {userId} = req.query;
        try {
            const userMovies = await userMoviesServices.getUserMovies({userId});
            res.status(200).json({
                data: userMovies,
                message: 'Listado de peliculas del usuario'
            })
        } catch (error) {
            next(error);
        }
    });

    router.post('/',validationHandler(createUserMovieSchema),async function(req,res,next){
        const {body:userMovie} = req;

        try {
            const createdUserMovieId = await userMoviesServices.createUserMovie({userMovie});

            res.status(201).json({
                data: createdUserMovieId,
                message: 'La pelicula fue agregada al listado del usuario'
            });
        } catch (error) {
            next(error);
        }
    })

    router.delete('/:userMovieId',validationHandler({userMovieId: userMovieIdSchema},'params'),await function(req,res,next){
        //Sacamos el userMoviesId de los parametros de la ruta
        const { userMovieId } = req.params;
        try {
            const deletedUserMovieId = await userMoviesServices.deleteUserMovie({userMovieId});

            res.status(200).json({
                data: deletedUserMovieId,
                message: 'La pelicula fue eliminada del listado del usuario'
            })
        } catch (error) {
            next(error);
            
        }
    })
}

module.exports = userMovieApi;
