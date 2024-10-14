import axios from 'axios';
import FormData from 'form-data';

const username = 'turnero';
const password = 'qY#hvVweRlkHp4L8@B';

export const getTokenUsuarios = async (token: string) => {
  const authToken = Buffer.from(`${username}:${password}`).toString('base64');
  const formData = new FormData();
  formData.append('token', token);

  const response = await axios.post('http://api.edemsa.local/accounts/getuserbytoken', formData, {
    headers: {
      'Authorization': `Basic ${authToken}`,
      ...formData.getHeaders(),
    },
  });

  return response.data;
};