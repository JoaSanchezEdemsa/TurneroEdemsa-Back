import axios from 'axios';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const username = "turnero";
const password = "qY#hvVweRlkHp4L8@B";

// Función para obtener sucursales
export const getSucursalbyCod = async (codUnicom: number) => {
  try {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');

    // Solicitud a la API externa
    const response = await axios.post(
      'http://api.edemsa.local/turnero/getsucursales', 
      {
        COD_UNICOM: codUnicom,  // Pasamos el COD_UNICOM en el cuerpo de la petición
      }, {
        headers: {
          'Authorization': `Basic ${authToken}`,
          'Content-Type': 'application/json',
        }
      }
    );

    return response.data.result; // Retorna los datos de la API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data from API'); // Lanza el error para que lo maneje el archivo principal
  }
};