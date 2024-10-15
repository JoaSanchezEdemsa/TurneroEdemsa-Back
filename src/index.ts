import express, { Request, Response } from 'express';
import { getSucursales } from './controlador/funciones_get/getSucursales'; 
// import { getBoxes } from './controlador/funciones_get/getBoxes';
// import { getEmpleados } from './controlador/funciones_get/getUsuarios';
import { getTokenUsuarios } from './controlador/funciones_get/getTokenUsuarios';
import { Empleado } from './models/Empleado';  
// import { postBoxes } from './controlador/funciones_post/postBoxes';
import { getClientesbyDNI } from './controlador/funciones_get/getClientesbyDNI';
import { AppDataSource } from './models/db';
import { postTvStatus } from './controlador/funciones_get/getTvStatus';
import { getMotivosBySucursal } from './controlador/funciones_get/getMotivosBySucursal';
import autenticacionUsuario from './autenticaciones/loginAutenticar';
import * as dotenv from 'dotenv';
import cors from 'cors';
import 'reflect-metadata';
import axios from 'axios';

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
      const response = await axios.post('http://api.edemsa.local/turnero/sucursales/tablet/turnos/new/save', { dni, nombre, motivo, sucursal }, {
          headers: {
              'Authorization': `Basic ${authToken}`,
              'Content-Type': 'application/json'
          }
      });
      if (response.status === 200) {
          res.sendStatus(200); // Confirmar la recepción al frontend
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
      res.json({ usuarioExiste: true, cliente: cliente.result }); // Retorna true y los datos del cliente
    } else {
      res.json({ usuarioExiste: false }); // Retorna true indicando que el usuario no existe
    }
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    res.status(500).json({ message: 'Error fetching data from API' });
  }
});


app.get('/login', async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    const empleadoData = await getTokenUsuarios(token);
    res.json(empleadoData);
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en login' });
  }
});

// app.use('/getusuario', getTokenUsuarios, (req, res) => {
//   res.send('Bienvenido a la página de inicio');

// });

// Endpoint para obtener cajas según el COD_UNICOM
// app.get('/getboxes', async (req: Request, res: Response) => {
//   try {
//     const empleadoRepository = AppDataSource.getRepository(Empleado);

//     // Obtener el último empleado logueado
//     const ultimoEmpleadoLogueado = await empleadoRepository.findOne({
//       where: { legajo: empleadoData.result.legajo }
//     });
//     // Manejar el caso donde no hay un empleado logueado
//     if (!ultimoEmpleadoLogueado) {
//       return 
//     }

//     console.log(ultimoEmpleadoLogueado)

//     // Usar el COD_UNICOM del empleado para obtener las cajas
//     const cajas = await getBoxes(ultimoEmpleadoLogueado[0].COD_UNICOM);

//     // Verificar que se obtuvieron las cajas
//     if (!cajas || cajas.length === 0) {
//       return 
//     }

//     res.json(cajas); // Enviar las cajas obtenidas al frontend
//   } catch (error) {
//     console.error('Error al obtener cajas:', error);
//     res.json({ message: 'Error al obtener cajas' }); // Responder con un mensaje de error genérico
//   }
// });

// Endpoint para obtener empleados
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

