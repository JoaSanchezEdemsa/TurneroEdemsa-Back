import axios from 'axios';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

// Función para obtener las cajas
export const getBoxes = async (codUnicom: string) => {
  try {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');

    // Solicitud a la API externa con el COD_UNICOM
    const response = await axios.post('http://api.edemsa.local/turnero/sucursales/getboxes', {
      COD_UNICOM: codUnicom // Aquí usamos el COD_UNICOM recibido
    }, {
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data; // Retorna los datos de la API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching boxes from API');
  }
};
