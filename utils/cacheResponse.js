const { config } = require('../config');

function cacheResponse(res,seconds){
    //DEBEMOS AGREGAR CACHE SIEMPRE QUE NO ESTEMOS EN ENTORNO DE DESARROLLO
    if(!config.dev){
        res.set("Cache-Control",`publi, max-age=${seconds}`);
    }
}

module.exports = cacheResponse;
