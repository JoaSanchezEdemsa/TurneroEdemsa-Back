import axios from 'axios';
import FormData from 'form-data';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

export const getStatusTurnoFinalizado = async (id: string , NICK: string , NIC: string, CODIGO: string) => {
    try {
      if (!id) {
          throw new Error('id is required');
      }
      if (!NICK) {
          throw new Error('NICK is required');
      }
      if (!NIC) {
          throw new Error('NIC is required');
      }
      if (!CODIGO) {
          throw new Error('motivo is required');
      }
      const authToken = Buffer.from(`${username}:${password}`).toString('base64');
      const formData = new FormData();
      formData.append('id', id);
      formData.append('nick', NICK);
      formData.append('nic', NIC);
      formData.append('codigo', CODIGO);

      const response = await axios.post('http://api.edemsa.local/turnero/sucursales/turnos/finalizar', formData, {
          headers: {
              'Authorization': `Basic ${authToken}`,
              ...formData.getHeaders()
          }
      });
      console.log(response.data)
      return response.data;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data from API');
  }
};
