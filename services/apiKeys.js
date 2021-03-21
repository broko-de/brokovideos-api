/*
SERVICIO QUE PERMITE A PARTIR DE UN API KEY TOKEN PODAMOS OPTENER LOS SCOPES QUE ES REQUERIDOS
A LA HORA DE HACER SIGN IN PARA PODER FIRMAR EL JWT CON LOS SCOPES CORRESPONDIENTE DE ACUERDO
AL API TOKEN QUE NOSOTROS ENVIEMOS
*/
const MongoLib = require('../lib/mongo');

class ApiKeysService{
    constructor(){
        this.collection = 'api-keys';
        this.mongoLib = new MongoLib();
    }

    /*
        Metodo para obtener el APIKEY de la base de datos de acuerdo al token que se le envia
    */
    async getApiKey({token}){
        const [ apiKey ] = await this.mongoLib.getAll(this.collection,{ token });
        return apiKey;
    }
}

module.exports = ApiKeysService;