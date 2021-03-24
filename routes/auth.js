const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const ApiKeysService = require('../services/apiKeys');
//PARA LA CREACION DE USUARIOS
const UsersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');
const { createUserSchema } = require('../utils/schemas/users');


const { config } = require('../config');

//USAMOS LA ESTRATEGIA BASICA PARA EL SIGN IN agregas al modulo el contenido del archivo basic.
require('../utils/auth/strategies/basic');

//DEFINIMOS RUTAS DE AUTENTICACION
function authApi(app){
    const router = express.Router();
    app.use('/api/auth',router);

    //instanciamos el servicio de APIKEY
    const apiKeysService = new ApiKeysService();

    const usersServices = new UsersService();

    //RUTA ENVIO DE FORMULARIO LOGIN
    router.post('/sign-in',async function(req,res,next){
        //DEBEMOS VERIFICAR QUE DEL CUERPO VENGA UN ATRIBUTO apikeytoken que le vamos a pasar al sign-in
        //para saber que permisos vamos a firmar en el JWT.
        const { apiKeyToken } = req.body;
        //SI NO EXISTE DEVOLVEMOS UN ERRROR UNAUTHORIZED
        if(!apiKeyToken){
            next(boom.unauthorized('apikeytoken is required'));
        }

        //SI EXISTE IMPLEMENTAMOS LA AUTENTICACION BASICA POR MEDIO DE PASSPORT
        passport.authenticate('basic', function(error,user){            
            try {
                //SI HAY UN ERROR O NO HAY UN USUARIO QUIERE DECIR QUE LA ESTREEGIA BASIC NO ENCONTRO UN USUARIO
                if(error || !user){
                    next(boom.unauthorized())
                }

                //implementamos el login, recibe como parametro el usuario y definimos que no vamos a implementar una session.
                //Tambien tiene una callaback como parametro que buscará la APIKEY para saber que permisos tiene
                req.login(user, {session: false}, async function(error){
                    if(error){
                        next(error);
                    }

                    //BUSCAMOS LA APIKEY DE ACUERDO A LO QUE NOS MANDO POR LA REQUEST
                    const apiKey = await apiKeysService.getApiKey({token: apiKeyToken});

                    //SI NO EXISTE EL APIKEY DEVOLVEMOS ERROR DE NO AUTORIZADO
                    if(!apiKey){
                        next(boom.unauthorized());
                    }

                    //EN CASO DE TENER EL APIKEY CONSTRUIMOS NUESTRO JWT, por lo que extramos
                    //el id del usuario, el nombre y el email.
                    const {_id:id,name,email} = user;

                    //CONSTRUIMOS UN PAYLOAD QUE IRA EN EL TOKEN, compuesto por el id de usuario, nombre, email y los scopes que vienen
                    //del apikey definida para ese tipo de usuario
                    const payload = {
                        sub:id,
                        name,
                        email,
                        scopes: apiKey.scopes
                    }

                    //CONSTRUIMOS EL TOKEN POR MEDIO DEL PAYLOAD, EL SECRET DE NUESTRO ARCHIVO CONFIG Y PODEMOS PASARLE OPCIONES
                    //EN ESTE CASO EL TIEMPO DE EXPIRACIÓN -> 15 minutos
                    const token = jwt.sign(payload,config.authJwtSecret,{
                        expiresIn: '15m'
                    });

                    //DEVOLVEMOS LA RESPUESTA DE NUESTRA RUTA CON EL TOKEN Y EL USUARIO CON LOS DATOS DE ID, NOMBRE y Email.
                    return res.status(200).json({
                        token,
                        user:{id,name,email}
                    });
                });
            } catch (error) {
                next(error)
            }
        })(req,res,next); //con este clousure nos aseguramos que nuestra authenticate custom callback funcione sin problemas
    });

    //Agregamos RUTA DE SIGN-UP
    router.post('/sign-up',validationHandler(createUserSchema),async function(req,res,next){
        //Extraigo del request el body con el nombre de user
        const {body:user} = req;

        try {
            const createdUserId = await usersServices.createUser({user});

            res.status(201).json({
                data:createdUserId,
                message: 'El usuario fue creado correctamente'
            });
        } catch (error) {
            next(error);
        }
    });
}

module.exports = authApi;

