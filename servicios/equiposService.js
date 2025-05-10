const fs = require('fs')
const path = require('path')
const { equiposMock } = require('../utils/mocks/equipos.json')
const MongoLib = require('../lib/mongo')

class EquiposService{
    mongoDB
    collection

    constructor(){
        this.mongoDB = new MongoLib()
        this.collection = 'equipos'
    }

    async getEquipos(){
        try {
            const filePath = path.join(__dirname, '../utils/mocks/equipos.json');
            const data = await fs.promises.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer equipos.json:', error);
            throw error;
        }
    }

    async getEquipoById(id){
        try {
            const equipos = await this.getEquipos();
            const equipo = equipos.find(e => e.id === id);
            
            if (!equipo) {
                throw new Error('Equipo no encontrado');
            }
            
            return equipo;
        } catch (error) {
            console.error('Error al buscar equipo por ID:', error);
            throw error;
        }
    }

    async crearEquipo(equipo){
        try {
            if (!equipo.team || !equipo.league) {
                throw new Error('Datos del equipo incompletos');
            }

            // Añadir fecha de creación
            equipo.createdAt = new Date();
            
            const createdEquipoId = await this.mongoDB.createEquipo(this.collection, equipo);
            return createdEquipoId;
        } catch (error) {
            console.error('Error en createEquipo:', error);
            throw error;
        }
    }

}

module.exports = EquiposService