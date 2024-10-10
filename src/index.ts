import express, { Request, Response } from 'express';
import { getSucursales } from './controlador/funciones_get/getSucursales'; 
import { getBoxes } from './controlador/funciones_get/getBoxes';
// import { getEmpleados } from './controlador/funciones_get/getUsuarios';
import { getTokenUsuarios } from './controlador/funciones_get/getTokenUsuarios';
import { Empleado } from './models/Empleado';  
import autenticacionUsuario from './autenticaciones/loginAutenticar';
// import { postBoxes } from './controlador/funciones_post/postBoxes';
import { getClientesbyDNI } from './controlador/funciones_get/getClientesbyDNI';
import { AppDataSource } from './models/db';
import { postTvStatus } from './controlador/funciones_get/getTvStatus';
import * as dotenv from 'dotenv';
import cors from 'cors';
import 'reflect-metadata';

dotenv.config();

const app = express();
const port = 8080;

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));


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

app.post('/getclientes', async (req: Request, res: Response) => {
  try {
    const dni = req.body.dni as string; 
    const cliente = await getClientesbyDNI(dni);
    // Verifica si el cliente existe
    if (cliente.result != false) {
      res.json({ usuarioExiste: true, cliente: cliente.result }); // Retorna true y los datos del cliente
    } else {
      res.json({ usuarioExiste: false }); // Retorna true indicando que el usuario no existe
    }
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    res.status(500).json({ message: 'Error fetching data from API' });
  }
});


// Endpoint de login: obtiene el empleado y guarda si no existe
app.get('/login', async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;

    // Obtener datos del empleado desde el token
    const empleadoData = await getTokenUsuarios(token);
    console.log('Empleado obtenido:', empleadoData);

    const empleadoRepository = AppDataSource.getRepository(Empleado);
    let empleadoExistente = await empleadoRepository.findOneBy({ legajo: empleadoData.result.legajo });

    // Si no existe, lo guardamos
    if (!empleadoExistente) {
      const nuevoEmpleado = empleadoRepository.create({
        legajo: empleadoData.result.legajo,
        usuario: empleadoData.result.USUARIO, 
        COD_UNICOM: empleadoData.result.usuarioOPEN.COD_UNICOM,
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

      empleadoExistente = await empleadoRepository.save(nuevoEmpleado);
    }

    // Devolver el empleado guardado/existente con el COD_UNICOM
    console.log("_______________________")
    console.log(empleadoExistente)
    res.json(empleadoExistente);

  } catch (error) {
    console.error('Error fetching or saving data:', error);
    res.status(500).json({ message: 'Error fetching or saving data' });
  }
});

// Endpoint para obtener las cajas según el COD_UNICOM del empleado
app.get('/getboxes', async (req: Request, res: Response) => {
  const codUnicom = req.query.COD_UNICOM as string; // Obtener COD_UNICOM desde la query

  try {
    const boxes = await getBoxes(codUnicom); // Llamada con el COD_UNICOM
    res.json(boxes);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).json({ message: 'Error fetching boxes from API' });
  }
});



app.get('/empleados', async (req: Request, res: Response) => {
  try {
    const empleadoRepository = AppDataSource.getRepository(Empleado);
    const empleados = await empleadoRepository.find();
    res.json(empleados);
  } catch (error) {
    console.error('Error fetching empleados:', error);
    res.status(500).json({ message: 'Error fetching empleados' });
  }
});

// app.get('/getboxes', async (req: Request, res: Response) => {
//   const codUnicom = req.params.COD_UNICOM;

//   try {
//     // Llamar a la función que obtiene las cajas con el COD_UNICOM
//     const cajas = await getBoxes(codUnicom);

//     // Devuelve las cajas obtenidas
//     res.json(cajas);
//   } catch (error) {
//     console.error('Error fetching boxes:', error);
//     res.status(500).json({ message: 'Error fetching boxes' });
//   }
// });


// Función para obtener tv/status
app.get('/tv/status', async (req: Request, res: Response) => {
  try {
    const tvStatus = await postTvStatus();
    res.json(tvStatus);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from API' });
  }
});




//endpoint para tablet /getmotivobysucursal

// Middleware para autenticación y página de inicio
app.use('/', autenticacionUsuario, (req, res) => {
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