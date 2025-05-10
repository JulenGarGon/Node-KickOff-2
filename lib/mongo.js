const { MongoClient, ObjectId } = require('mongodb')

//const MONGO_URI = 'mongodb://localhost:27017/'
const MONGO_URI = 'mongodb+srv://database:database@spw2025.iinxn.mongodb.net/equipos?retryWrites=true&w=majority'
const DB_USER = 'user'
const DB_PASSWORD = 'password'
const DB_NAME = 'equipos'

class MongoLib {
    async connect() {

        if (MongoLib.connection != null) {
            return MongoLib.connection.db(DB_NAME);
        } else {
            try {
                MongoLib.connection = await MongoClient.connect(MONGO_URI)
                console.log('conectado a BBDD')
                return MongoLib.connection.db(DB_NAME)
            } catch(e){
                console.log('error en conexión a BBDD')
                return e
            }
        }
    }
    async  getEquipos(collection) {
        try {
            let db = await this.connect()
            let result = await db.collection(collection).find().toArray();
            return result;
        } catch (e) {
            return e;
        }
    }
   
}


MongoLib.ObjectId = ObjectId;
module.exports = MongoLib;