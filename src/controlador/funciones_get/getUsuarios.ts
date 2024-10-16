import axios from 'axios';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

// Función para obtener las cajas
export const getEmpleados = async (codUnicom: number) => {
  try {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');

    const response = await axios.post('http://api.edemsa.local/turnero/sucursales/getusuarios', {
      COD_UNICOM: codUnicom,
    }, {
      headers: {    
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/json' ,
      }
    });

    return response.data; // Retorna los datos de la API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data from API'); // Lanza el error para que lo maneje el archivo principal
  }
};