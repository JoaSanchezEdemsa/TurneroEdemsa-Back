import axios from 'axios';
import FormData from 'form-data';


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
    const formData = new FormData();
    formData.append('nombre_box', newBox.nombre_box);
    formData.append('COD_UNICOM', newBox.COD_UNICOM);
    formData.append('created_by', newBox.created_by);


    const response = await axios.post('http://api.edemsa.local/turnero/sucursales/boxes/new', formData, {
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'multipart/form-data', // Asegúrate de usar multipart/form-data
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al agregar la caja:', error);
    throw new Error('Error al agregar la caja');
  }
};

// // Función que elimina una caja por su ID
export const deleteBox = async (borrar: { idBox: number; NICK: string; }) => {
  try {
    const authToken = Buffer.from(`${username}:${password}`).toString('base64');
    const formData = new FormData();
    formData.append('idBox', borrar.idBox);
    formData.append('NICK', borrar.NICK);


    const response = await axios.post('http://api.edemsa.local/turnero/sucursales/boxes/delete', formData, {
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