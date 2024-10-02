import express from "express";

const mainRouter = express.Router();

mainRouter.get('/', (_, res) => {
    res.send('Hola desde el router');
});

// AGREGAR RUTAS SEGUN SEA NECESARIO











export { mainRouter };