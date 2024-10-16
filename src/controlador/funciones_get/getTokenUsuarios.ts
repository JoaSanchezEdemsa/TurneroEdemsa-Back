import axios from 'axios';
import FormData from 'form-data';

const username = 'turnero';
const password = 'qY#hvVweRlkHp4L8@B';

export const getTokenUsuarios = async (token: string) => {
  const authToken = Buffer.from(`${username}:${password}`).toString('base64');
  const formData = new FormData();
  formData.append('token', token);

  try {
    const response = await axios.post('http://api.edemsa.local/accounts/getuserbytoken', formData, {
      headers: {
        'Authorization': `Basic ${authToken}`,
        ...formData.getHeaders(),
      },
    });

    console.log('Respuesta de la API externa:', response.data); // Verificar lo que devuelve la API
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw new Error('Error en la comunicación con la API externa');
  }
};
