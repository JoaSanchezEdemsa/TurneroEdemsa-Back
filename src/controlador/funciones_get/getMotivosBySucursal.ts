import axios from 'axios';
import FormData from 'form-data';

const username = "turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

export const getMotivosBySucursal = async (COD_UNICOM: string) => {
    try {
        const authToken = Buffer.from(`${username}:${password}`).toString('base64');
        const formData = new FormData();
        formData.append('COD_UNICOM', COD_UNICOM);

        const response = await axios.post('http://api.edemsa.local/turnero/sucursales/tablet/turnos/new/getmotivosbysucursal', formData, {
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