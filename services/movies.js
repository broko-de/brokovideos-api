const MongoLib = require('../lib/mongo');

class MoviesService {
    constructor(){
        this.collection = 'movies';
        this.mongoDb = new MongoLib();
    }
    //SERVICIO QUE TRAE LA LISTA DE PELICULAS
    async getMovies({tags}){
        //CREAMOS LA QUERY EN CASO DE QUE ENVIEN TAGS COMO PARAMETRO
        const query = tags && {tags: {$in:tags}};
        const movies = await this.mongoDb.getAll(this.collection,query);
        //RETORNA TODAS LAS PELICULAS o UN ARRAY VACIO
        return movies || [];
    }

    //SERVICIO QUE TRAE UNA PELICULA
    async getMovie({movieId}){
        const movie = await this.mongoDb.get(this.collection,movieId);
        //RETORNA TODAS LAS PELICULAS o UN OBJETO VACIO
        return movie || {};
    }

    //SERVICIO PARA CREAR UNA PELICULA
    async createMovie({movie}){
        const createMovieId = await this.mongoDb.create(this.collection,movie);
        //RETORNA EL DE LA PELICULA CREADA
        return createMovieId;
    }

    //SERVICIO QUE ACTUALIZA UNA PELICULA
    //LE MANDO LA ID Y LOS DATOS COMO PARAMETROS PERO ESPECIFICO QUE PUEDEN ESTAR VACIOS
    async updateMovie({movieId, movie}={}){
        const updatedMovieId = await this.mongoDb.update(this.collection,movieId,movie);
        //RETORNA EL ID DE LA PELICULA ACTUALIZADA
        return updatedMovieId;
    }

    //SERVICIO QUE ELIMINA UNA PELICULA
    async deleteMovie({movieId}){
        const deletedMovieId = await this.mongoDb.delete(this.collection,movieId);
        //RETORNA EL ID DE LA PELICULA ELIMINADA
        return deletedMovieId;
    }
}

module.exports = MoviesService;
