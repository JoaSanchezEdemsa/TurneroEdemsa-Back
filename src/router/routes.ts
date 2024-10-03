import express from "express";
import { getTurno, getMotivo, getSucursal, addTurnoToDB } from "../controler/controler";

const mainRouter = express.Router();

mainRouter.get('/', (_, res) => {
    res.send('Hola desde el router');
});

mainRouter.get('/turno/ver_turno', getTurno);
mainRouter.get('/motivo/ver_motivo', getMotivo);
mainRouter.get('/sucursal/ver_sucursal', getSucursal);
mainRouter.post('/turno/:agregar', addTurnoToDB);



export { mainRouter };