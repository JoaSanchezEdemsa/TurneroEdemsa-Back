import axios from 'axios';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

// Función para obtener sucursales
export const getSucursales = async () => {
  try {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');

    // Solicitud a la API externa
    const response = await axios.get('http://api.edemsa.local/turnero/getsucursales', {
      headers: {
        'Authorization': `Basic ${authToken}`
      }
    });

    return response.data; // Retorna los datos de la API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data from API'); // Lanza el error para que lo maneje el archivo principal
  }
};
