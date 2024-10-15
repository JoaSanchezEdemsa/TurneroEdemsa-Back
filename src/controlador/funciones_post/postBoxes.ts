import axios from 'axios';

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
