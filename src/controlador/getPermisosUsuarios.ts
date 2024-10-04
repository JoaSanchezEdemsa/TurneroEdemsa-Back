import axios from 'axios';
import FormData from 'form-data';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

// Función para obtener los permisos de los usuarios
export const getPermisos = async (nick: string) => {
  try {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');

    const formData = new FormData();
    formData.append('nick', nick);

    // Realizar la solicitud GET a la API externa con el token como parámetro
    const response = await axios.get('http://api.edemsa.local/usuarios/getpermisos', {
      headers: {
        'Authorization': `Basic ${authToken}`,
      },
      params: {
        nick // Enviar el token como parámetro de consulta
      }
    });

    return response.data; // Retorna los datos de la API
  } catch (error) {
    console.error('Error fetching permisos:', error);
    throw new Error('Error fetching permisos from API'); // Lanza el error para que lo maneje el archivo principal
  }
};


