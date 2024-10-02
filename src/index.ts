import express from "express";

const app = express();

app.use(express.json());

const PORT = 8080;

app.get('/', (_,res) => {
    console.log("hola");
    res.send("hola");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
