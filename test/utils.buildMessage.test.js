const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

describe('Utils - buildMessage',function(){
    describe('When receives an entity and an action', function(){
        it('should return the respective message:', function(){
            const result = buildMessage('Pelicula','create');
            const expect = 'Pelicula creada';
            assert.deepStrictEqual(result,expect);
        });
    });
    describe('When receives an entity and an action is a list', function(){
        it('should return the respective message whit the entity in plural:', function(){
            const result = buildMessage('Pelicula','list');
            const expect = 'Listado de Peliculas';
            assert.deepStrictEqual(result,expect);
        });
    });
});
