const passport = require('passport');
//Importamos 2 clases de la libreria passport-jwt
const {Strategy, ExtractJwt} = require('passport-jwt');
//Imporamos libreria para mostrar mensajes de errores
const boom = require('@hapi/boom');

//importamos el servicio de usuarios
const UsersServices = require('../../../services/users');
//importamos el archivo de configuracion para saber con que secret fue firmado el token
const {config} = require('../../../config');

//Implementamos una estretegia para JWT
passport.use(
    //esta estrategia recibe como parametros para su constructor el secretOrKey y de donde sacamos el JWT
    new Strategy({
        secretOrKey: config.authJwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //lo extraemos del header cuando hagamos una peticion como un bearer token
    },
    //La estrategia tambien recibe un callback donde contiene el payload del token ya decodificado
    // y otro callback donde se define si encontramos el usuario o si debemos devolver un error
    async function (tokenPayload, callback) {
        const usersServices = new UsersServices();
        try {
            //buscarmos al usuario por medio del email del payload del token
            const user = await usersServices.getUser({email: tokenPayload.email});
            if(!user){
                //si no existe retornamos un error de unauthorized
                return callback(boom.unauthorized(),false);
            }
            //si existe borramos el atributo password del usuario para devolverlo
            delete user.password;
            //retornamos en la callback el error nulo y devolvemos el usuario y un atributo scope que viene del token que se firmo anterioremente
            callback(null,{...user, scope: tokenPayload.scope});

        } catch (error) {
            callback(error);
        }
    })
);
