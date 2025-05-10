const express = require('express')
const app = express()
const equiposAPI = require('./rutas/equipos');
const EquiposService = require('./servicios/equiposService')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const equiposService  = new EquiposService()

/*app.get('/', async function(req, res) {
    try {
        const equipos = await equiposService.getEquipos();
        res.status(200).json(equipos); 
    } catch (err) {
        res.status(500).json({
            error: 'Error al obtener los equipos',
            details: err.message
        });
    }
});*/

/*app.get('/api/getAll', function(req, res){

})*/

equiposAPI(app)

var server = app.listen('8080', () => {
    console.log(`servidor escuchando en ${server.address().port}`)
})