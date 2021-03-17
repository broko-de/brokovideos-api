const boom = require('@hapi/boom');
const { config } = require('../../config');

/*
    FUNCIONALIDAD DE AYUDA PARA DETERMINAR SI AGREGO EL STACK O NO
    EL STACK ES EL LUGAR DONDE OCURRE EL ERROR
*/
function whitErrorStack(error,stack){
    //SI ESTAMOS EN MODO DEV 
    if(config.dev){
        //spread operator ...error porque el error trae datos relacionados a boom
        return { ...error,stack}
    }
    //EN MODO PRODUCCION RETORNO SOLO EL ERROR
    return error;
}
/*
    Middleware para imprimir el log de errores
    SE RECIBE UN CUARTO PARAMETRO "ERR" QUE SE LO ENVIAMOS A NEXT PARA PODER
    MANIPULAR EL ERROR DECIR COMO LO IMPRIMIMOS Y 
    LLAMAR AL NEXT CON ESTE ERROR PARA SABER O NO SI HAY QUE LLAMAR A NUESTRO MIDDLEWARE DE ERROR
*/
function logErrors(err,req,res,next){
    console.log(err);
    next(err);
}

/*
    Middleware que verifica si un error no del tipo Boom para que
    apartir de ahi todos los errores puedan tener ese formato
*/
function wrapErrors(err,req,res,next){
    if(!err.isBoom){
        next(boom.badImplementation(err.message,err.stack));
    }

    next(err);

}

/*
    Middleware nos va ayudar a darle un manejo al error
    los errores son necesarios mostrar en formato JSON. Node lo hace en HTML.
    Con Boom es necesario sacar el output del error para mostralo
*/
function errorHandler(err,req,res,next){
    const {output : {statusCode,payload  }} = err;
    //SIN BOOM
    //res.status(err.status || 500);
    //res.json(whitErrorStack(err.message,err.stack));
    //CON BOOM
    res.status(statusCode);
    res.json(whitErrorStack(payload,err.stack));
}

module.exports = {
    logErrors,
    wrapErrors,
    errorHandler
};
