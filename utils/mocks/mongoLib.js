/* 
    SINON NOS PERMITE HACER STUBS. CADA VEZ QUE CREAMOS UN STUB SINON SINON
    LES INYECTA UNAS PROPIEDADES PARA SABER SI FUERON LLAMADOS O NO
    ESTO ES IMPORTANTE PARA QUE PODAMOS EN NUESTROS SERVICIOS PROBAR SI CUANDO EL SERVICIO FUE EJECUTADO
    LLAMO A LOS METODOS DE LAS RESPECTIVAS LIBRERIAS

*/
const sinon = require('sinon');

// Treamos los mocks de peliculas y el metodo de filtrado para hacer un test con tags
const { moviesMock, filteredMoviesMocks } = require('./movies');

/*
    Creacion del stub getAll de mongo.
*/
const getAllStub = sinon.stub();
//aqui especificamos que cuando el stub se ejecuta con el argumento movies, responda con el listado de las peliculas
getAllStub.withArgs('movies').resolves(moviesMock);


const tagQuery = {tags: {$in: ['Drama']}};
//aqui especificamos que cuando el stub se ejcuta con el argumento tagQuery, responda con la version filtrada de las peliculas con Drama
getAllStub.withArgs('movies',tagQuery).resolves(filteredMoviesMocks('Drama'));

//Creamos un stub para el metodo crear y especificamos que cuando el stub se llame con la funcion create de nuestro servicio devuelva el id de la pelicula
const createStub = sinon.stub().resolves(moviesMock[0].id);

const updateStub = sinon.stub().resolves(moviesMock[0].id);

const deleteStub = sinon.stub().resolves(moviesMock[0].id);

const getStub = sinon.stub().resolves(moviesMock[0]);

class MongoLibMock{
    //Metodo getAll que simula el getAll de mongoLib
    getAll(collection,query){
        return getAllStub(collection,query);
    }

    //Metodo get que simula el get de mongoLib
    get(collection,movieId){
        return getStub(collection,movieId);
    }

    //Metodo create que simula el create de mongoLib
    create(collection, data){
        return createStub(collection,data);
    }

    //Metodo update que simula el update de mongoLib
    update(collection, movieId, data){
        return updateStub(collection,movieId,data);
    }

    //Metodo delete que simula el delete de mongoLib
    delete(collection, movieId){
        return deleteStub(collection,movieId);
    }
}

module.exports = {
    getStub,
    getAllStub,
    createStub,
    updateStub,
    deleteStub,
    MongoLibMock
};
