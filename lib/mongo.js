const { MongoClient, ObjectId} = require('mongodb');
const { config } = require('../config');

//CREAMOS CONSTANTES POR MEDIO DE ENCONDE PARA GARANTIZAR QUE
//SI HAY CARACTERES ESPECIALES NO HABRA PROBLEMAS DE CONECTARNOS
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib{
    //CONFIGURO EL CONTRATUCTOR DE LA CLASE CON LOS PARAMETROS DE LA URI Y EL NOMBRE DE LA BASE DE DATOS
    constructor(){
        this.client = new MongoClient(MONGO_URI,{useNewUrlParser: true});
        this.dbName = DB_NAME;
    }

    //METODO DE CONEXION - SINGLETON PARA QUE SE GENERE UNA UNICA CONEXION
    connect(){
        //CONSULTO SI NO EXISTE UNA CONEXION INSTANCIADA LA CREO POR MEDIO DE UNA PROMESA
        if(!MongoLib.connection){
            MongoLib.connection = new Promise((resolve,reject)=>{
                //CLIENT USA ERROR FIRST CALLBACK
                this.client.connect(err =>{
                    if(err){
                        reject(err);
                    }
                    //CREO LA CONEXION 
                    console.log('La conexión con MongoDB se estableció')
                    resolve(this.client.db(this.dbName));
                })
            })
        }
        return MongoLib.connection;
    }

    /* 
        Metodo para traer todos los elementos de una coleccion
        Params: collection: coleccion en cuestion de nuestra base de datos esto es generico para que esta libreria pueda usarse con distintos objetos
        Params: query: es una consulta con criterios de busqueda en caso de que se quiera buscar por algo en especifico
        return: devuelve la conexion del metodo connect (Promesa). En el then nos devuelve una instancia de la base de datos que tiene los metodos de mongo. Devolvemos un Array de los registros
    */
    getAll(collection,query){
        return this.connect().then(db=>{
            //llamamoos al metodo de mongo de busqueda por medio de una query 
            return db.collection(collection).find(query).toArray();
        });
    }

    /*
        metodo para obtener un solo elemento de la coleccion
        Params: collection: coleccion en cuestion de nuestra base de datos
        Params: id: id del elemento de la coleccion que queremos obtener
        return: devuelve la conexion del metodo connect (Promesa). En el then nos devuelve una instancia de la base de datos que tiene los metodos de mongo. Devolvemos un registro
    */
    get(collection,id){
        return this.connect().then(db=>{
            //llamamos al metodo de mongo que obtiene un registro de acuerdo a la Id
            return db.collection(collection).findOne({_id: ObjectId(id)});
        });
    }

    /*
        metodo para crear un registro en la coleccion de acuerdo a los datos que se envian
        Params: collection: coleccion en cuestion de nuestra base de datos
        Params: data: conjunto de valores con los que queremos crear un nuevo registro de la coleccion
        return: devuelve la conexion del metodo connect (Promesa). En el then nos devuelve una instancia de la base de datos que tiene los metodos de mongo. Devolvemos la ID
    */
    create(collection,data){
        return this.connect().then(db=>{
            //llamamos al metodo de mongo que crea un registro nuevo
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);
    }

    /*
        Metodo para actualizar un registro de la colección de acuerdo a su id. Si no existe lo creamos
        Params: collection: coleccion en cuestion de nuestra base de datos
        Params: id: id del elemento de la coleccion que queremos actualizar  
        Params: data: conjunto de valores con los que queremos actualizar el registro de la coleccion
        return: devuelve la conexion del metodo connect (Promesa). En el then nos devuelve una instancia de la base de datos que tiene los metodos de mongo. Devolvemos la ID
    */
    update(collection,id,data){
        return this.connect().then(db=>{
            //llamamos al metodo de mongo que actualizar un registro por su id, en casao de existir lo crea por eso usamos el 3er parametro upsert:true
            return db.collection(collection).updateOne({_id: ObjectId(id)},{$set:data},{upsert:true});
        }).then(result => result.upsertedId || id); // en caso de que no exista, devolvemos la Id del parametro
    }

    /*
        Metodo para eliminar un registro de la colección de acuerdo a su id
        Params: collection: coleccion en cuestion de nuestra base de datos
        Params: id: id del elemento de la coleccion que queremos eliminar  
        return: devuelve la conexion del metodo connect (Promesa). En el then nos devuelve una instancia de la base de datos que tiene los metodos de mongo. DEvolvemos la ID
    */
    delete(collection,id){
        return this.connect().then(db=>{
            //llamamos al metodo de mongo eliminar un registro de acuerdo a la Id
            return db.collection(collection).deleteOne({_id: ObjectId(id)});
        }).then(() => id);
    }
}

module.exports = MongoLib;
