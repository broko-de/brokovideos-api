const MongoLib = require('../lib/mongo');

class UserMoviesService{

    constructor(){
        this.collection = 'user-movies',
        this.mongoLib = new MongoLib()
    }

     /*
        Servicio para obtener el listado de peliculas de un usuario
     */
    async getUserMovies({userId}){
        //busco las peliculas de un usuarioId
        const query = userId && {userId};
        const userMovies = await this.mongoLib.getAll(this.collection,query);
        return userMovies || [];
    }

    /*
        Servicio para agregar una pelicula al listado de peliculas de un usuario
    */
    async createUserMovie({userMovie}){
        const createdUserMovieId = await this.mongoLib.create(this.collection,userMovie);
        return createdUserMovieId; 
    }

    async deleteUserMovie({userMovieId}){
        const deletedUserMovieId = await this.mongoLib.delete(this.collection,userMovieId);
        return deletedUserMovieId;
    }
}

module.exports = UserMoviesService;
