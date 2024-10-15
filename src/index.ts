import express, { Request, Response } from 'express';
import { getSucursales } from './controlador/funciones_get/getSucursales'; 
import { getBoxes } from './controlador/funciones_get/getBoxes';
import { getEmpleados } from './controlador/funciones_get/getUsuarios';
import { getTokenUsuarios } from './controlador/funciones_get/getTokenUsuarios';
import { Empleado } from './models/Empleado';  
import { postBoxes } from './controlador/funciones_post/postBoxes';
import { getClientesbyDNI } from './controlador/funciones_get/getClientesbyDNI';
import { AppDataSource } from './models/db';
import { postTvStatus } from './controlador/funciones_get/getTvStatus';
import { getMotivosBySucursal } from './controlador/funciones_get/getMotivosBySucursal';
import autenticacionUsuario from './autenticaciones/loginAutenticar';
import * as dotenv from 'dotenv';
import cors from 'cors';
import 'reflect-metadata';
import axios from 'axios';
import qs from 'qs'

dotenv.config();

const app = express();
const port = 8080;

app.use(cors({
  origin: 'http://turnero:3000', 
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
    const { dni, nombre, motivo, sucursal } = req.body;

    const data = qs.stringify({ dni, nombre, motivo, sucursal }); 

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

app.get('/login', autenticacionUsuario, async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    
    // Obtener datos del empleado desde el token
    const empleadoData = await getTokenUsuarios(token); 
    console.log('Empleado obtenido:', empleadoData);
    
    // Revisar si ya existe un empleado con el legajo en la base de datos
    const empleadoRepository = AppDataSource.getRepository(Empleado);
    let empleadoExistente = await empleadoRepository.findOneBy({ legajo: empleadoData.result.legajo }); // Ajuste aquí para acceder al objeto result
    
    // Si no existe, lo guardamos
    if (!empleadoExistente) {
      const nuevoEmpleado = empleadoRepository.create({
        legajo: empleadoData.result.legajo,
        usuario: empleadoData.result.USUARIO, 
        COD_UNICOM: empleadoData.result.COD_UNICOM,
        nombrecompleto: empleadoData.result.nombrecompleto,
        nombre: empleadoData.result.nombre,
        apellido: empleadoData.result.apellido,
        email: empleadoData.result.email,
        posicion: empleadoData.result.posicion,
        telefono: empleadoData.result.telefono,
        celular: empleadoData.result.celular, 
        direccion: empleadoData.result.direccion,
        lugar: empleadoData.result.lugar, 
        tipoDoc: empleadoData.result.tipoDoc, 
        dni: empleadoData.result.dni, 
        nacimiento: empleadoData.result.nacimiento, 
        edad: empleadoData.result.edad, 
        sexo: empleadoData.result.sexo, 
        tipousuario: empleadoData.result.tipousuario, 
        empresa: empleadoData.result.empresa, 
        interno: empleadoData.result.interno, 
        bloqueado: empleadoData.result.bloqueado, 
        baja: empleadoData.result.baja, 
        pass: empleadoData.result.pass,
        created_at: empleadoData.result.created_at, 
        created_by: empleadoData.result.created_by, 
        autorizado_at: empleadoData.result.autorizado_at, 
        autorizado_by: empleadoData.result.autorizado_by, 
      });
      
      // Guardar en la base de datos
      empleadoExistente = await empleadoRepository.save(nuevoEmpleado);
    }
    
    // Responder con los datos del empleado guardado o existente
    res.json(empleadoExistente); 
    console.log('Empleado guardado/existente:', empleadoExistente);
    
  } catch (error) {
    console.error('Error fetching or saving data:', error); 
    res.status(500).json({ message: 'Error fetching or saving data' });
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
      const tvStatus = await postTvStatus(COD_UNICOM as string); // Asegúrate de convertir a string
      res.json(tvStatus);
    } else {
      res.status(400).json({ message: 'COD_UNICOM no proporcionado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from API' });
  }
});

app.get('/getsucursalesTV', async (req: Request, res: Response) => {
  try {
    const sucursales = await getSucursales();
    console.log(sucursales);
    await postSucursales (sucursales);
    res.json(sucursales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from API' });
  }
});



//endpoint para tablet /getmotivobysucursal

// Middleware para autenticación y página de inicio
app.use('/',(req, res) => {
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