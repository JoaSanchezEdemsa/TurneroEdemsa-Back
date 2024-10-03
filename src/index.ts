import express from 'express';
import { AppDataSource } from './persistance/db';
import  {Turn}  from './persistance/turno';
import { mainRouter } from './router/routes' ;
import cors from 'cors';
import {config} from 'dotenv';
import { Motive } from './persistance/motivo';
import { Subsidiary } from './persistance/sucursal';
const app = express();

config();
const database = process.env.DATABASE_NAME
console.log(database)
const username = process.env.DATABASE_USERNAME
console.log(username)
const password = process.env.DATABASE_PASSWORD
console.log(password)
const host = process.env.DATABASE_HOST
console.log(host)


app.use(express.json());
const port = 8080;

app.use(function(_, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origins, X-Requested-With, Content-Type, Accept");
    next();
})
    
app.use(express.json());
app.use ('/' , mainRouter);
app.use (cors());
app.post('turno/agregar', (req, res) => {
    const { nombre, apellido, dni, fecha } = req.body;
    res.status(201).json({
        nombre,
        apellido,
        dni,            
        fecha   
    })
})

app.get('/', (_,res) => {
    console.log("hola");
    res.send("hola");
});

AppDataSource.initialize()
    .then(async() => {
        console.log('Base de datos conectada');

//Validación turnos        
        const validation_turno = AppDataSource.getRepository(Turn);
        const turnos_exist = await validation_turno.find();
        if (turnos_exist.length == 0){
            const turno = new Turn('Alfonso', 'Magallanes', 47332098, new Date(), new Date());
            console.log("---------------------------------AGREGADO--------------------------------------------")
            AppDataSource.manager.save(turno)
            console.log(turnos_exist)
        }
        
//Validación motivos
        const validation_motivo = AppDataSource.getRepository(Motive);
        const motivos_exist = await validation_motivo.find();
        if (motivos_exist.length == 0){
            const motivo = new Motive('Reclamo', '5 minutos');
            AppDataSource.manager.save(motivo)
            console.log(motivos_exist)
        }

//Validación sucursales
        const validation_sucursal = AppDataSource.getRepository(Subsidiary);
        const sucursales_exist = await validation_sucursal.find();
        if (sucursales_exist.length == 0){
            const sucursal = new Subsidiary(1301, 'Las Heras');
            AppDataSource.manager.save(sucursal)
            console.log(sucursales_exist)
        }

//Puerto de conexión
        app.listen(port, () => {
            console.log(`Servidor: http://localhost:${port}`);
        });

})
    .catch(err => {
        throw err
});


