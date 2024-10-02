import express from "express";
import { getTurno, addTurnoToDB } from "../controler/controler";

const mainRouter = express.Router();

mainRouter.get('/', (_, res) => {
    res.send('Hola desde el router');
});

mainRouter.get('/turno', getTurno);
mainRouter.post('/turno/agregar', addTurnoToDB);



export { mainRouter };