import axios from 'axios';
import FormData from 'form-data';


const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B";

export const addOperador = async (operador: {id: number, COD_UNICOM:number; empleado: string; }) => {
    try {
      const authToken = Buffer.from(`${username}:${password}`).toString('base64');
      const formData = new FormData();
      formData.append('Operador', operador.empleado);
      formData.append('COD_UNICOM', operador.COD_UNICOM);
      formData.append('Box_id', operador.id);


  
      const response = await axios.post('http://api.edemsa.local/turnero/sucursales/getboxes', formData, {
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

  export const estado = async (estado: {id: number, enable: string; }) => {
    try {
      const authToken = Buffer.from(`${username}:${password}`).toString('base64');
      const formData = new FormData();
      formData.append('id', estado.id);
      formData.append('estado', estado.enable);
 
      const response = await axios.post('http://api.edemsa.local/turnero/sucursales/getboxes', formData, {
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