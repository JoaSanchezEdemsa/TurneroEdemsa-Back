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
        const validation_turno = AppDataSource.getRepository(Turn);
        const turnos_exist = await validation_turno.find();
        if (turnos_exist.length == 0){
            const turno = new Turn('Alfonso', 'Magallanes', 47332098, new Date());
            AppDataSource.manager.save([turno])
            console.log(turnos_exist)
        }
        app.listen(port, () => {
            console.log(`Servidor: http://localhost:${port}`);
        });
})
    .catch(err => {
        throw err
});


