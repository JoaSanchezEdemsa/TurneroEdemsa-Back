import axios from 'axios';
import FormData from 'form-data';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

// Función para obtener los empleados según el token proporcionado
export const getTokenEmpleados = async (token: string) => {
  try {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');

    // Crear un nuevo objeto FormData
    const formData = new FormData();
    formData.append('token', token); // Usar la variable token en lugar de un valor fijo

    // Solicitud a la API externa con el body en formato form-data
    const response = await axios.post('http://api.edemsa.local/accounts/getuserbytoken', formData, {
      headers: {    
        'Authorization': `Basic ${authToken}`,
        ...formData.getHeaders() // Incluir los headers de form-data automáticamente
      }
    });

    return response.data; // Retorna los datos de la API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data from API'); // Lanza el error para que lo maneje el archivo principal
  }
};
