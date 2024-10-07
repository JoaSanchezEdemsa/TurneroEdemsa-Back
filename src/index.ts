import express, { Request, Response } from 'express';
import { getSucursales } from './controlador/funciones_get/getSucursales'; 
import { getBoxes } from './controlador/funciones_get/getBoxes';
import { getEmpleados } from './controlador/funciones_get/getUsuarios';
import { getTokenUsuarios } from './controlador/funciones_get/getTokenUsuarios';
import autenticacionUsuario from './autenticaciones/loginAutenticar';
import { postBoxes } from './controlador/funciones_post/postBoxes';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 8080;

app.use(cors());

app.use(express.json());

// Función para obtener los datos de las sucursales
app.get('/getsucursales', async (req: Request, res: Response) => {
  try {
    const sucursales = await getSucursales();
    res.json(sucursales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from API' });
  }
});

// Función para obtener las cajas de las sucursales y hacer un POST al frontend
app.get('/getboxes', async (req: Request, res: Response) => {
  try {
    const boxes = await getBoxes();
    console.log(boxes); 
    await postBoxes(boxes); 
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
    const empleado = await getTokenUsuarios(token); 
    res.json(empleado); 
    console.log(empleado);
  } catch (error) {
    console.error('Error fetching data:', error); 
    res.status(500).json({ message: 'Error fetching data from API' });
  }
});

// Middleware para autenticación y página de inicio
app.use('/', autenticacionUsuario, (req, res) => {
  res.send('Bienvenido a la página de inicio');

});

// Inicialización del servidor
app.listen(port, () => {
  console.log(`El server está corriendo en el puerto: http://turnero:${port}`);
});
