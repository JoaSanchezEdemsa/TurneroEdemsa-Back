import axios from 'axios';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

export const getBoxes = async (codUnicom: string) => {
  try {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');
    console.log("COD_UNICOM recibido:", codUnicom);

    const response = await axios.post('http://api.edemsa.local/turnero/sucursales/getboxes', {
      COD_UNICOM: codUnicom // Usamos el COD_UNICOM
    }, {
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data; // Retorna los datos de las cajas
  } catch (error) {
    console.error('Error fetching boxes from API:', error);
    throw new Error('Error fetching boxes from API');
  }
};

