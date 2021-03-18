/*
    FUNCIONALIDAD QUE CREA EL MENSAJE QUE SE DEBE DEVOLVER EN UNA REQUEST
*/
function buildMessage(entity,action){
    let message = '';
    switch (action) {
        case 'create':
            message = `${entity} creada`
            break;
        case 'list':
            message = `Listado de ${entity}s`
            break;            
    }
    return message;
}

module.exports = buildMessage;
