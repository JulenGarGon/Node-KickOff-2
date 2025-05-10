const express = require('express')
const EquiposService = require('../servicios/equiposService')

function equiposAPI(app){
    const router = express.Router()
    app.use('/api/equipos', router)

    const equiposService = new EquiposService()

    router.get('/', async function (req, res, next){
        try{
            const equipos = await equiposService.getEquipos()
            res.status(200).json(
                {
                    data: equipos,
                    message: 'Equipos recuperados con éxito'
                }
            );
        } catch(err){
            next(err)
        }
    });

    router.get('/:id', async function (req, res, next){
        try {
            const { id } = req.params
            const equipo = await equiposService.getEquipoById(Number(id))
            res.status(200).json({
                data: equipo,
                message: 'Equipo recuperado con éxito'
            });
        } catch(err) {
            if (err.message === 'Equipo no encontrado') {
                res.status(404).json({
                    error: 'No encontrado',
                    message: 'El equipo solicitado no existe'
                });
            } else {
                next(err);
            }
        }
    });

    router.post('/', async function (req, res, next) {
        const { body: equipo } = req; // Extrae los datos del equipo del body

        try {
            const createdEquipoId = await equiposService.crearEquipo(equipo);
            res.status(201).json({
                data: createdEquipoId,
                message: 'Equipo creado exitosamente'
            });
        } catch (err) {
            next(err);
        }
    });


    router.get('/favoritos', async (req, res) => {
        try {
            const equiposFav = await equiposService.getEquiposFavoritos(); // Método que debes agregar en EquiposService
            res.status(200).json({
                data: equiposFav,
                message: 'Equipos favoritos recuperados con éxito'
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener equipos favoritos' });
        }
    });

}

module.exports = equiposAPI