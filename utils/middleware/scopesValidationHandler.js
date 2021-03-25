const boom = require('@hapi/boom');

/*
    FUNCION QUE VALIDA LOS SCOPES DE UN USARIO QUE ACCEDE A RUTAS PROTEGIDAS POR JWT
    PARAMS array allowedScopes: arreglo con el/los scopes permitido/s para la ruta
*/
function scopeValidationHanlder(allowedScopes){
    //DEVUELVE UN MIDDLEWARE
    return function(req,res,next){  
        // CONSULTAMOS SI EXISTE EL USUARIO EN LA PETICION Y SI TIENE SCOPES
        if(!req.user || (req.user && !req.user.scopes)){
            next(boom.unauthorized('No posee scopes'))
        }

        //BUSCAMOS SI EL SCOPE DEL USUARIO ESTA INCLUIDO EN LOS SCOPES PERMITIDOS 
        //PARA EL TIPO DE USUARIO
        const hasAccess = allowedScopes
            .map(allowedScope =>req.user.scopes.includes(allowedScope)) //recorremos los Scopes permitidos y consultamos si esta incluido
            .find(allowed => Boolean(allowed)); //Si existe devolvemos un boolean true o fallse

        //SI TIENE ACCESO LLAMAMOS AL SIGUIENTE MIDDLEWARE
        if(hasAccess){
            next()
        }else{
            //SI NO TIENE ACCESO RETORNAMOS UN ERROR MEDIO DE BOOM
            next(boom.unauthorized('Scopes insuficientes'));
        }

    }
}

module.exports = scopeValidationHanlder;
