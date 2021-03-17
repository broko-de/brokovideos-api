/* MIDDLEWARE PARA VALIDACION DE DATOS PARA SABER QUE DATOS SON ENVIADOS EN UN ENDPOINTS */
const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

/*
    Funcion que permitirá validad si los valos que enviamos siguen las reglas del esquema POR MEDIO DE JOI
    Params: data: son los datos que recibimos por las peticiones de la API
    Params: schema: es el schema con el cual vamos a comporar los datos y validar que se cumplan las reglas
*/
function validate(data,schema){
    const { error } = joi.object(schema).validate(data)
    return error;
}

/*
    Middleware que recibe como
    Params: schema: determina el formato del objeto que vamos a enviar
    Params: check: especificamos donde queremos checkear ese esquema, por defecto el body de una request, tambien podrían ser los parametros la query, etc
*/
function validationHandler(schema, check= "body"){
    //retornamos una función del formato middleware
    return function(req,res,next){
        const err = validate(req[check],schema);
        //si la validacion devuelve un error ejecuto el middleware de error que definimos
        //sino ejecuta el siguiente middleware 
        // SIN BOOM 
        //error? next(new Error(error)) : next();
        //CON BOOM
        err? next(boom.badRequest(err)) : next();
    }
}

module.exports = validationHandler;
