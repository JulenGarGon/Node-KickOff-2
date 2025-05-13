const express = require('express')
const EquiposService = require('../servicios/equiposService')


function equiposAPI(app){
    const router = express.Router()
    app.use('/api/equipos', router)

<<<<<<< HEAD
    
    router.get('/', async function (req, res, next) {
        try {
            const equipos = await equiposService.getEquipos();
            res.status(200).json({
                data: equipos,
                message: 'equipos recuperadas con éxito'
            });
        } catch (err) {
            console.log(`se produjo un error ${err}`);
        }
    });
=======
    const equiposService = new EquiposService()
>>>>>>> parent of bd17501 (Modificacion para despliegue)


    router.get('/', async function (req, res, next){
        try{
            const equipos = await equiposService.getEquipos()
            res.status(200).json(
                {
                    data: equipos,
                    message: 'equipos recuperadas con éxito'
                }
            )
        } catch(err){
            console.log(`se produjo un error ${err}`)
        } 
    })

    router.post('/', async function (req, res, next){
        try {
            const resultado = await equiposService.addEquipo(req.body);
    
            if (resultado.yaExiste) {
                return res.status(409).json({
                    data: resultado.equipo,
                    message: 'El equipo ya está en favoritos'
                });
            }
    
            res.status(201).json({
                data: resultado.equipo,
                message: 'Equipo añadido a favoritos con éxito'
            });
    
        } catch(err){
            console.error(`Error al añadir equipo favorito: ${err}`);
            res.status(500).json({ error: `Error al añadir equipo: ${err}` });
        } 
    });
    
    
    

    router.delete('/:id', async function (req, res, next){
        try {
            const eliminado = await equiposService.deleteEquipo(req.params.id);
            if (eliminado) {
                res.status(200).json({ message: 'equipo eliminado con éxito' });
            } else {
                res.status(404).json({ message: 'equipo no encontrado' });
            }
        } catch(err){
            console.error('Error al borrar el equipo:', err);
            res.status(500).json({ error: 'Error al borrar el equipo' });
        }
    });
    
    

<<<<<<< HEAD
    
    const frontendPath = path.join(__dirname, '../public/browser');
    app.use(express.static(frontendPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
=======
>>>>>>> parent of bd17501 (Modificacion para despliegue)
}

module.exports = equiposAPI