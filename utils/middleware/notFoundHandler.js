const boom = require('@hapi/boom');

/*
    Middleware para poder manejar errores del tipo 404
    No se envia como parametro el next poraque seria la comprobacion al final de la rutas. 
*/
function notFoundHandler(req,res){
    //Descontruccion de objetos: Sacamos los valores statusCode y payload del objeto boom.nofFound()
    const { output: {statusCode, payload}} = boom.notFound();
    //respondemos en formato json
    res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;
