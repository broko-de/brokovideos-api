const assert = require('assert');
const proxiquire = require('proxiquire');

const { moviesMock, filterdMoviesMocks, MoviesServiceMook } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer');

describe('router - movies',function(){
    const route = proxiquire('../routes/movies',{
        '../services/movies': MoviesServiceMook
    });

    const request = testServer(route);
    describe('GET /movies', function(){
        it('should respond with status 200', function(done){
            request.get('/api/movies').expect(200,done);
        })
    })
})