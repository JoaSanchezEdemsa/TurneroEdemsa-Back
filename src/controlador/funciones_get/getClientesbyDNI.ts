import axios from 'axios';
import FormData from 'form-data';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

// Función para obtener los empleados según el token proporcionado
export const getClientesbyDNI = async (dni: string) => {
  try {
    const authAPI = Buffer.from(`${username}:${password}`).toString('base64');

    // Crear un nuevo objeto FormData
    const formData = new FormData();
    formData.append('dni', dni); 

    // Solicitud a la API externa con el body en formato form-data
    const response = await axios.post('http://api.edemsa.local/turnero/sucursales/tablet/turnos/new/getclientebydni', formData, {
      headers: {    
        'Authorization': `Basic ${authAPI}`,
        ...formData.getHeaders() 
      }
    });

    return response.data; // Retorna los datos de la API
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data from API'); 
  }
};