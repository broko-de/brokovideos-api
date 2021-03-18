const assert = require('assert');
const proxyquire = require('proxyquire'); // nos permite requerir el servicio y reemaplar la libreria de mongo por nuestro mock de mongo

const { MongoLibMock, getStub,getAllStub,createStub,updateStub,deleteStub } = require('../utils/mocks/mongoLib');

const { moviesMock, MoviesServiceMook } = require('../utils/mocks/movies');

describe("Services - movies", function(){
    //remplazo la libreria de Mongo por la libreria Mock de Mongo
    const MoviesService = proxyquire('../services/movies',{
        '../lib/mongo': MongoLibMock
    });

    const moviesService = new MoviesService();
    
    //METODO GETMOVIES
    describe('when getMovies method is called',async function(){
        //VERIFICAMOS QUE SE LLAME CORRECTAMENTE AL SERVICIO DE GETMOVIES - COMO NUESTRO SERVICIO ES ASYNC-AWAIT el CALLBACK TIENE QUE TENER ASYNC-AWAIT        
        it('should call the getall MongoLib method', async function(){            
            await moviesService.getMovies({});
            //CONDICION QUE QUEREMOS EVALAR
            assert.strictEqual(getAllStub.called,true);
        });        
        //VERIFICAMOS EL SERVICIO DE GETMOVIES - COMO NUESTRO SERVICIO ES ASYNC-AWAIT el CALLBACK TIENE QUE TENER ASYNC-AWAIT
        it('should return an array of movies',async function(){
            //OBTENEMOS EL RESULTADO DE NUESTRO MOCK DE MONGO
            const result = await moviesService.getMovies({});
            //SETEAMOS LO QUE DEBERIAMO RECIBIR
            const expected = moviesMock;
            //POR MEDIO DE LA CONPARACION CON ASSERTS VERIFICAMOS EL RESULTADO
            assert.deepStrictEqual(result,expected);
        })
    });

    //METODO GET UNA PELICULA
    describe('when getMovie method is called',async function(){
        //VERIFICAMOS QUE SE LLAME CORRECTAMENTE AL SERVICIO DE GETMOVIE - COMO NUESTRO SERVICIO ES ASYNC-AWAIT el CALLBACK TIENE QUE TENER ASYNC-AWAIT        
        it('should call the get MongoLib method', async function(){            
            await moviesService.getMovie('4300b55977ce4a7a94700c5c');
            //CONDICION QUE QUEREMOS EVALAR
            assert.strictEqual(getStub.called,true);
        });        
        //VERIFICAMOS EL SERVICIO DE GETMOVIES - COMO NUESTRO SERVICIO ES ASYNC-AWAIT el CALLBACK TIENE QUE TENER ASYNC-AWAIT
        it('should return a movie',async function(){
            //OBTENEMOS EL RESULTADO DE NUESTRO MOCK DE MONGO
            const result = await moviesService.getMovie('4300b55977ce4a7a94700c5c');
            //SETEAMOS LO QUE DEBERIAMO RECIBIR
            const expected = moviesMock[0];
            //POR MEDIO DE LA CONPARACION CON ASSERTS VERIFICAMOS EL RESULTADO
            assert.deepStrictEqual(result,expected);
        })
    });

    //METODO CREATE UNA PELICULA
    describe('when createMovie method is called',async function(){
        //VERIFICAMOS QUE SE LLAME CORRECTAMENTE AL SERVICIO DE CREATEMOVIE - COMO NUESTRO SERVICIO ES ASYNC-AWAIT el CALLBACK TIENE QUE TENER ASYNC-AWAIT        
        it('should call the create MongoLib method', async function(){            
            await moviesService.createMovie({});
            //CONDICION QUE QUEREMOS EVALAR
            assert.strictEqual(createStub.called,true);
        });        
        //VERIFICAMOS EL SERVICIO DE CREATEMOVIE - COMO NUESTRO SERVICIO ES ASYNC-AWAIT el CALLBACK TIENE QUE TENER ASYNC-AWAIT
        it('should return a movieId',async function(){
            //OBTENEMOS EL RESULTADO DE NUESTRO MOCK DE MONGO
            const result = await moviesService.createMovie({});
            //SETEAMOS LO QUE DEBERIAMO RECIBIR
            const expected = moviesMock[0].id;
            //POR MEDIO DE LA CONPARACION CON ASSERTS VERIFICAMOS EL RESULTADO
            assert.deepStrictEqual(result,expected);
        })
    });


    //METODO UPDATE UNA PELICULA
    describe('when updateMovie method is called',async function(){
        //VERIFICAMOS QUE SE LLAME CORRECTAMENTE AL SERVICIO DE UPDATEMOVIE - COMO NUESTRO SERVICIO ES ASYNC-AWAIT el CALLBACK TIENE QUE TENER ASYNC-AWAIT        
        it('should call the update MongoLib method', async function(){            
            await moviesService.updateMovie('4300b55977ce4a7a94700c5c',{});
            //CONDICION QUE QUEREMOS EVALAR
            assert.strictEqual(updateStub.called,true);
        });        
        //VERIFICAMOS EL SERVICIO DE UPDATEMOVIE - COMO NUESTRO SERVICIO ES ASYNC-AWAIT el CALLBACK TIENE QUE TENER ASYNC-AWAIT
        it('should return a movieId',async function(){
            //OBTENEMOS EL RESULTADO DE NUESTRO MOCK DE MONGO
            const result = await moviesService.updateMovie('4300b55977ce4a7a94700c5c',{});
            //SETEAMOS LO QUE DEBERIAMO RECIBIR
            const expected = moviesMock[0].id;
            //POR MEDIO DE LA CONPARACION CON ASSERTS VERIFICAMOS EL RESULTADO
            assert.deepStrictEqual(result,expected);
        })
    });


    //METODO DELETE UNA PELICULA
    describe('when deleteMovie method is called',async function(){
        //VERIFICAMOS QUE SE LLAME CORRECTAMENTE AL SERVICIO DE DELETEMOVIE - COMO NUESTRO SERVICIO ES ASYNC-AWAIT el CALLBACK TIENE QUE TENER ASYNC-AWAIT        
        it('should call the delete MongoLib method', async function(){            
            await moviesService.deleteMovie('4300b55977ce4a7a94700c5c');
            //CONDICION QUE QUEREMOS EVALAR
            assert.strictEqual(deleteStub.called,true);
        });        
        //VERIFICAMOS EL SERVICIO DE DELETEMOVIE - COMO NUESTRO SERVICIO ES ASYNC-AWAIT el CALLBACK TIENE QUE TENER ASYNC-AWAIT
        it('should return a movieId',async function(){
            //OBTENEMOS EL RESULTADO DE NUESTRO MOCK DE MONGO
            const result = await moviesService.deleteMovie('4300b55977ce4a7a94700c5c');
            //SETEAMOS LO QUE DEBERIAMO RECIBIR
            const expected = moviesMock[0].id;
            //POR MEDIO DE LA CONPARACION CON ASSERTS VERIFICAMOS EL RESULTADO
            assert.deepStrictEqual(result,expected);
        })
    });


})