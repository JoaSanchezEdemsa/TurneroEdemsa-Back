import axios from 'axios';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

export const getBoxes = async () => {
  const authToken = Buffer.from(`${username}:${password}`).toString('base64');

  const response = await axios.post('http://api.edemsa.local/turnero/sucursales/getboxes', {
    COD_UNICOM: 1201,
  }, {
    headers: {
      'Authorization': `Basic ${authToken}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

