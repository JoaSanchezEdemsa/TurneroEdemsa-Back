import axios from 'axios';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

// Función para obtener las cajas
export const postTvStatus = async () => {
  try {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');

    // Solicitud a la API externa con el body que incluye COD_UNICOM
    const response = await axios.post('http://api.edemsa.local/turnero/tv/status', {
      COD_UNICOM: '1201' 
    }, {
      headers: {    
        'Authorization': `Basic ${authToken}`,
      }
    });

    return response.data; // Retorna los datos de la API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data from API'); 
  }
};