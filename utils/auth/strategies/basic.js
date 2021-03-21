//LAS ESTRATEGIAS DE AUTENTICACION NOS SIRVEN PARA DEFINIR COMO NOS VAMOS A AUTENTICAR EN LAS DIFERENTES RUTAS
//Importamos libreria passportjs
const passport = require('passport');
//Importamos BasicStrategy haciendo un destructuring de la libreria.
const { BasicStrategy } = require('passport-http');
//Importamos boom para manejar errores
const boom = require('@hapi/boom');
//Importamos bcrypt para verificar el password que nos pasan con el password que esta almacenado en BD
const bcrypt = require('bcrypt');

//Importamos el servicio del usuario para acceder a sus metodos
const UserService = require('../../../services/users');

/*
    Implementamos la estrategia por medio de BasicStrategy definiendo una funcino callback que recibe como parametros:
    Params: email: el email del usuario que queremos verificar
    Params: password: el password del usuario que queremos verificar
    Params: callback: funcion callback con la que se define si el usuario fue encontrado  o no
*/
passport.use(new BasicStrategy(
    async function(email,password, callback){
        const userService = new UserService();
        try {
            //buscamos al usuario por el email
            const user = userService.getUser({email});
            //verificamos si el usuario existe o no
            if(!user){
                //retornamos un error de unauthorized con un false
                return callback(boom.unauthorized(),false);
            }
            //verificamos si el password es igual al de la base de datos
            if(!(await bcrypt.compare(password,user.password))){
                //retornamos un error de unauthorized con un false
                return callback(boom.unauthorized(),false);
            }
            //no es recomendable darle tanta información en el error de autenticación. El mensaje debe ser genérico Usuario o Contraseña inválida
            
            //Debemos borrar el campo password del objeto user para que no sea visible en el resto de la aplicacion
            delete user.password;

            //si paso las verificaciones la funcion callback devuelve error null y el usuario logeado
            return callback(null,user);

        } catch (error) { //en caso de error llamamos el callback y le pasamos el error de esta forma la estrategi
            //que hubo un error obteniendo el usuario  y nos dara un unauthorized
            return callback(error)
        }
    })
);