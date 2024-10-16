import axios from 'axios';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

// Función que obtiene las cajas utilizando el COD_UNICOM
export const getBoxesbyCod = async (codUnicom: number) => {
  try {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');

    const response = await axios.post('http://api.edemsa.local/turnero/sucursales/getboxes', {
      COD_UNICOM: codUnicom,  // Pasamos el COD_UNICOM en el cuerpo de la petición
    }, {
      headers: {
        'Authorization': `Basic ${authToken}`,  // Usamos autenticación básica
        'Content-Type': 'application/json',
      },
    });

    return response.data;  // Devolvemos los datos obtenidos de la API
  } catch (error) {
    console.error('Error al obtener las cajas:', error);
    throw new Error('Error al obtener las cajas');
  }
};
