import express, { Request, Response } from 'express';
import { getSucursales } from './controlador/funciones_get/getSucursales'; 
import { getBoxes } from './controlador/funciones_get/getBoxes';
import { getBoxesbyCod } from './controlador/funciones_get/getBoxesbyCod';
import { getEmpleados } from './controlador/funciones_get/getUsuarios';
import { getTokenUsuarios } from './controlador/funciones_get/getTokenUsuarios';
import { Empleado } from './models/Empleado';  
import { postBoxes } from './controlador/funciones_post/postBoxes';
import { getClientesbyDNI } from './controlador/funciones_get/getClientesbyDNI';
import { AppDataSource } from './models/db';
import { postTvStatus } from './controlador/funciones_get/getTvStatus';
import { getMotivosBySucursal } from './controlador/funciones_get/getMotivosBySucursal';
import { getEmpleadosbyCod } from './controlador/funciones_get/getUsuariosbyCod';
import { getTurnos } from './controlador/funciones_get/getTurnosbyCod';
import { getPermisosbyNick } from './controlador/funciones_get/getPermisosbyNick';
//import autenticacionUsuario from './autenticaciones/loginAutenticar';
import * as dotenv from 'dotenv';
import cors from 'cors';
import 'reflect-metadata';
import axios from 'axios';
import qs from 'qs'

dotenv.config();

const app = express();
const port = 8080;

const allowedOrigins = ['http://localhost:3000', 'http://turnero:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());

const username = "turnero";
const password = "qY#hvVweRlkHp4L8@B";


// Función para obtener los datos de las sucursales
app.get('/getsucursales', async (req: Request, res: Response) => {
  try {
    const sucursales = await getSucursales();
    console.log(sucursales);
    res.json(sucursales);
  } catch (error) { 
    res.status(500).json({ message: 'Error fetching data from API' });
  }
});

app.get('/getmotivos', async (req: Request, res: Response) => {
  try {
      const COD_UNICOM = req.query.COD_UNICOM as string;
      const motivos = await getMotivosBySucursal(COD_UNICOM);
      res.json(motivos);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching data from API' });
  }
});

app.post('/submitmotivo', async (req: Request, res: Response) => {
  try {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');
    const { dni, nombre, motivo, COD_UNICOM } = req.body;

    const data = qs.stringify({ dni, nombre, motivo, COD_UNICOM }); 

    const response = await axios.post(
      'http://api.edemsa.local/turnero/sucursales/tablet/turnos/new/save',
      data,
      {
        headers: {
          'Authorization': `Basic ${authToken}`,
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
      }
    );

    if (response.status === 200) {
      res.sendStatus(200); 
    } else {
      res.status(500).json({ message: 'Error enviando datos a la API externa' });
    }
  } catch (error) {
    console.error('Error enviando datos:', error);
    res.status(500).json({ message: 'Error enviando datos a la API externa' });
  }
});

app.post('/getclientes', async (req: Request, res: Response) => {
  try {
    const dni = req.body.dni as string; 
    const cliente = await getClientesbyDNI(dni);
    if (cliente.result != false) {
      res.json({ usuarioExiste: true, cliente: cliente.result }); 
    } else {
      res.json({ usuarioExiste: false }); 
    }
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
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

app.get('/login', async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    const empleadoData = await getTokenUsuarios(token);
    console.log(empleadoData);
    res.json(empleadoData);
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en login' });
  }
});

app.get('/getboxesbyCod', async (req: Request, res: Response) => {
  try {
    const codUnicom = parseInt(req.query.codUnicom as string, 10);
    const boxes = await getBoxesbyCod(codUnicom);
    res.json(boxes);
  } catch (error) {
    console.error('Error al obtener las cajas:', error);
    res.status(500).json({ message: 'Error al obtener las cajas' });
  }
});

app.get('/getUsuariosbyCod', async (req: Request, res: Response) => {
  try {
    const codUnicom = parseInt(req.query.codUnicom as string, 10);
    const usuarios = await getEmpleadosbyCod(codUnicom);
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener las cajas:', error);
    res.status(500).json({ message: 'Error al obtener las cajas' });
  }
});

app.get('/empleados', async (req: Request, res: Response) => {
  try {
    const empleadoRepository = AppDataSource.getRepository(Empleado);
    const empleados = await empleadoRepository.find();
    res.json(empleados);
    console.log("---------------------------------------------------------",empleados)
  } catch (error) {
    console.error('Error fetching empleados:', error);
    res.status(500).json({ message: 'Error fetching empleados' });
  }
});

// Función para obtener tv/status
app.get('/tv/status', async (req: Request, res: Response) => {
  const { COD_UNICOM } = req.query; // Usa query en lugar de body
  
  try {
    if (COD_UNICOM) {
      const tvStatus = await postTvStatus(COD_UNICOM as string); // convertir a string
      res.json(tvStatus);
    } else {
      res.status(400).json({ message: 'COD_UNICOM no proporcionado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from API' });
  }
});

app.get('/getturnosbycod', async (req: Request, res: Response) => {
  try {
      const COD_UNICOM = req.query.COD_UNICOM as string;
      const turnos = await getTurnos(COD_UNICOM);
      res.json(turnos);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching data from API' });
  }
});

app.get('/getpermisosbynick', async (req: Request, res: Response) => {
  try {
      const NICK = req.query.NICK as string;
      const permisos = await getPermisosbyNick(NICK);
      console.log('________________')
      console.log(permisos)
      res.json(permisos);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching data from API' });
  }
});




//endpoint para tablet /getmotivobysucursal

// Middleware para autenticación y página de inicio
app.use('/', (req, res) => {
  res.send('Bienvenido a la página de inicio');
});

// Inicialización del servidor
app.listen(port, () => {
  console.log(`El server está corriendo en el puerto: http://turnero:${port}`);
});

async function main() {
  try{
      await AppDataSource.initialize();
      console.log('Database connected')
      app.listen(8081);
      console.log('Server is listening on port', 8081);
    }
    catch(error){
        console.log(error);
    } 
}

main();