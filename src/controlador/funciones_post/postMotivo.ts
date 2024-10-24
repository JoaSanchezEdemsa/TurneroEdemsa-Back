import axios from 'axios';
import FormData from 'form-data';


const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

export const addMotivo = async (newBox: {motivo: string;  COD_UNICOM: number; created_by: number; estimatedTime:number;}) => {
    try {
      const authToken = Buffer.from(`${username}:${password}`).toString('base64');
      const formData = new FormData();
      formData.append('motivo', newBox.motivo);
      formData.append('COD_UNICOM', newBox.COD_UNICOM);
      formData.append('created_by', newBox.created_by);
      formData.append('tiempo_estimado', newBox.estimatedTime)
  
  
      const response = await axios.post('http://api.edemsa.local/turnero/sucursales/motivos/new', formData, {
        headers: {
          'Authorization': `Basic ${authToken}`,
          'Content-Type': 'multipart/form-data', // Asegúrate de usar multipart/form-data
        },
      });
      console.log('____________________________');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error al agregar el motivo:', error);
      throw new Error('Error al agregar el motivo');
    }
  };