import axios from 'axios';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

// Asegúrate de que esta función acepte un argumento
export const postTvStatus = async (COD_UNICOM: string) => {
  try {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');

    // Aquí se pasa COD_UNICOM como parte del body de la solicitud
    const response = await axios.post('http://api.edemsa.local/turnero/tv/status', {
      COD_UNICOM: COD_UNICOM
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