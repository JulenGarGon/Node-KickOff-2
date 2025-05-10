const { mongodb, MongoClient, ObjectId } = require('mongodb')
const { config } = require('../index')

const MONGO_URI = 'mongodb://localhost:27017/'
const DB_USER = 'jgarciagoinf'
const DB_PASSWORD = '2Bf50wYicQ4bCs12'
const DB_NAME = 'Equipos'
const MONGO_URI_ATLAS = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@kickoff.ay26qqa.mongodb.net/`

class MongoLib {
    async connect(){
        if(MongoLib.connection != null) {
            return MongoLib.connection.db(DB_NAME)
        } else {
            try{
                MongoLib.connect = await MongoClient.connect(MONGO_URI_ATLAS)
                console.log('conectado a BBDD')
                return MongoLib.connection.db(DB_NAME)
            } catch(e){
                console.log('error en conexion a BBDD')
                return e
            }
        }
    }

    getEquipos(collection, query){
        return this.connect().then( db => {
            return db.collection(collection).find(query).toArray();
        })
    }

    async getEquiposFav(collection){
        try{
            let db = await this.connect()
            let result = await db.collection(collection).find().toArray()
            return result
        } catch (e) {
            return e
        }
    }

    async createEquipo(collection, data) {
        try {
            const db = await this.connect();
            const result = await db.collection(collection).insertOne(data);
            return result.insertedId;
        } catch (e) {
            console.error('Error al crear equipo:', e);
            throw e;
        }
    }
}

module.exports = MongoLib