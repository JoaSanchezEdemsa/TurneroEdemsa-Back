import axios from 'axios';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

export const getMotivosOpenSGC = async () => {
    try {
        const authToken = Buffer.from(`${username}:${password}`).toString('base64');

        const response = await axios.post('http://api.edemsa.local/turnero/sucursales/getmotivosopen',  {}
            , {
            headers: {
                'Authorization': `Basic ${authToken}`,
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data from API');
    }
};