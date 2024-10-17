import axios from 'axios';
import FormData from 'form-data';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

export const getPermisosbyNick = async (NICK: string) => {
  try {
      if (!NICK) {
          throw new Error('NICK is required');
      }

      const authToken = Buffer.from(`${username}:${password}`).toString('base64');
      const formData = new FormData();
      formData.append('nick', NICK);

      const response = await axios.post('http://api.edemsa.local/usuarios/getpermisos', formData, {
          headers: {
              'Authorization': `Basic ${authToken}`,
              ...formData.getHeaders()
          }
      });

      return response.data;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data from API');
  }
};


