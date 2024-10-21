import axios from 'axios';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

// Función que publica las cajas al frontend
export const postBoxes = async (data: any) => {
  try {
    const response = await axios.post('http://turnero:3000', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Data posted to frontend:', response.status);
  } catch (error) {
    console.error('Error posting data to frontend:', error);
    throw new Error('Error posting data to frontend');
  }
};

// Función que agrega una nueva caja
export const addBox = async (newBox: { COD_UNICOM: number; nombre_box: string; created_by: number; }) => {
  try {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');

    const response = await axios.post('http://api.edemsa.local/turnero/sucursales/addbox', newBox, {
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al agregar la caja:', error);
    throw new Error('Error al agregar la caja');
  }
};

// Función que elimina una caja por su ID
export const deleteBox = async (boxId: number) => {
  try {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');

    const response = await axios.delete(`http://api.edemsa.local/turnero/sucursales/deletebox/${boxId}`, {
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al eliminar la caja:', error);
    throw new Error('Error al eliminar la caja');
  }
};
