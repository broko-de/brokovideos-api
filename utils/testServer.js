/*
    Se crea un Server especifico para pruebas,es importante separlo del server que usamos habitualmente
*/
const express = require('express');
const supertest = require('supertest');

function testServer(route){
    const app = express();
    route(app);
    return supertest(app);
}

module.exports = testServer;
