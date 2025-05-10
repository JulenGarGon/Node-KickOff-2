const MongoLib = require('../lib/mongo')

class EquiposService {
    constructor() {
        this.coleccion = 'equipos';
        this.mongoDB = new MongoLib();
    }

    async getEquipos() {
        try {
            return await this.mongoDB.getEquipos(this.coleccion);
        } catch (error) {
            console.error('Error recuperando equipos:', error);
            throw error;
        }
    }

    async addEquipo(equipo) {
        try {
            const db = await this.mongoDB.connect();
            const existente = await db.collection(this.coleccion).findOne({
                team: equipo.team,
                league: equipo.league
            });

            if (existente) {
                return { yaExiste: true, equipo: existente };
            }

            const result = await db.collection(this.coleccion).insertOne(equipo);
            return { insertado: true, equipo: { _id: result.insertedId, ...equipo } };
        } catch (error) {
            console.error('Error al añadir equipo:', error);
            throw error;
        }
    }

    async deleteEquipo(id) {
        try {
            if (!MongoLib.ObjectId.isValid(id)) {
                throw new Error('ID no válido');
            }

            const db = await this.mongoDB.connect();
            const result = await db.collection(this.coleccion).deleteOne({
                _id: new MongoLib.ObjectId(id)
            });

            return result.deletedCount === 1;
        } catch (error) {
            console.error('Error al eliminar el equipo:', error);
            throw error;
        }
    }
}

module.exports = EquiposService;
