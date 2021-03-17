//Se encarga de verificar si es verdad o no las comparaciones en nuestros test
const assert = require('assert');
//cada vez que hagamos un require esta libreria nos permite configurar que traiga nuestros mocks
const proxyquire = require('proxyquire'); 

//importamos los mocks para las pruebas
const { moviesMock, filterdMoviesMocks, MoviesServiceMook } = require('../utils/mocks/movies.js');
//importamos el servidor de testing
const testServer = require('../utils/testServer');

/*
    Definición de los Test para las rutas, con describe es lo que se visualizará en la consulta
    Params: Callback: una funcion que contendran los test
*/
describe('router - movies',function(){
    /*
        configuramos la rutas que seran interceptados por proxyquire para 
        que no se llamen los servicios.
        Params: paht : ruta del archivo de rutas
        Params: object : reemplazo de la ruta de servicios por la de los mocks
    */
    const route = proxyquire('../routes/movies',{
        '../services/movies': MoviesServiceMook
    });

    //instanciamos el servidor con las rutas definidas con los mocks
    const request = testServer(route);
    
    //Escribimos el test para la ruta de GET de listado de peliculas
    describe('GET /movies', function(){
        //COMPRUEBO QUE DEBO RECIBIR UN CODE=200. El done nos indica cuando finaliza le Test
        it('should respond with status 200', function(done){
            //expect es lo que se espera recibir cuando se haga una petición GET en el path que se le indica
            request.get('/api/movies').expect(200,done);
        });

        //COMPRUENO QUE DEBO REBICIR UNA RESPUESTA CON EL LISTADO DE PELICULAS
        //NOS TENEMOS QUE ASEGURAR QUE LAS RUTAS DEVUELVAN LOS DATOS COMO TENDRÏAN QUE SER 
        it('should respond with the list of movies', function(done){
            //COMPRUEBO RUTA Y EVALUAMOS LA FINALIZACION "end" DE LA PETICION POR MEDIO DE UNA FUNCION 
            request.get('/api/movies').end((err,res)=>{
                //CON ASSERT.DEEPSTRICTEQUAL COMPARAMOS OBJETOS
                assert.deepStrictEqual(res.body,{
                    data: moviesMock,
                    message: 'Listado de peliculas'
                });
                //INDICO QUE EL TEST FINALIZO
                done();
            })
        })
    });

    //Escribimos el test para la ruta de GET de una pelicula
    describe('GET /movies/:movieId', function(){
        it('should respond with status 200', function(done){
            request.get('/api/movies/e6f2b3141a494c998a941968').expect(200,done);
        });

        it('should respond with the detail of movie', function(done){
            request.get('/api/movies/e6f2b3141a494c998a941968').end((err,res)=>{
                assert.deepStrictEqual(res.body,{
                    data: moviesMock[0],
                    message: 'Detalle de la pelicula'
                });
                done();
            })
        });
    });

    //Escribimos el test para la ruta de GET de una pelicula
    describe('POST /movies', function(){
        it('should respond with status 201', function(done){
            request.post('/api/movies').expect(201,done);
        });

        it('should respond with the detail of movie', function(done){
            request.post('/api/movies').end((err,res)=>{
                assert.deepStrictEqual(res.body,{
                    data: moviesMock[0].id,
                    message: 'Pelicula creada'
                });
                done();
            })
        });
    });

    
    //Escribimos el test para la ruta de GET de una pelicula
    describe('UPDATE /movies/:movieId', function(){
        it('should respond with status 200', function(done){
            request.put('/api/movies/e6f2b3141a494c998a941968').expect(200,done);
        });

        it('should respond with the detail of movie', function(done){
            request.put('/api/movies/e6f2b3141a494c998a941968',data).end((err,res)=>{
                assert.deepStrictEqual(res.body,{
                    data: moviesMock[0].id,
                    message: 'Pelicula modificada'
                });
                done();
            })
        });
    });
    
    //Escribimos el test para la ruta de DELETE de una pelicula
    describe('DELETE /movies/:movieId', function(){
        it('should respond with status 200', function(done){
            request.delete('/api/movies/e6f2b3141a494c998a941968').expect(200,done);
        });

        it('should respond with the detail of movie', function(done){
            request.delete('/api/movies/e6f2b3141a494c998a941968').end((err,res)=>{
                assert.deepStrictEqual(res.body,{
                    data: moviesMock[0].id,
                    message: 'Pelicula eliminada'
                });
                done();
            })
        });
    });
})