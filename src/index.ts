import express, { Request, Response } from 'express';
import { getSucursales } from './controlador/getsucursales'; 
import { getBoxes } from './controlador/getboxes';
import { getEmpleados } from './controlador/getUsuarios';
import { getTokenEmpleados } from './controlador/getTokenUsuarios';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Conexión exitosa con el servidor');
  });

// Función para obtener los datos de las sucursales

app.get('/getsucursales', async (req: Request, res: Response) => {

  try {

    const sucursales = await getSucursales();
    res.json(sucursales);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from API' });
  }

});

// Función para obtener las cajas de las sucursales

app.get('/getboxes', async (req: Request, res: Response) => {

  try {

    const boxes = await getBoxes();
    res.json(boxes);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from API' });
  }

});

// Función para obtener los usuarios

app.get('/getusuarios', async (req: Request, res: Response) => {

  try {

    const empleados = await getEmpleados();
    res.json(empleados);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from API' });
  }

});

// Función para extraer el token desde los parámetros de consulta

app.get('/login', async (req: Request, res: Response) => {
    try {

        const token = req.query.token as string;

        const empleados = await getTokenEmpleados(token); 
        res.json(empleados); 

    } catch (error) {
        console.error('Error fetching data:', error); 
        res.status(500).json({ message: 'Error fetching data from API' });
    }
});

app.listen(port, () => {
  console.log(`El server está corriendo en el puerto: http://turnero:${port}`);
});
