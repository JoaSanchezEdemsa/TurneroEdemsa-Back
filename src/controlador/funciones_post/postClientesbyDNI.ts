import axios from 'axios';

export const postClientesbyDNI = async (data2: any) => {
    try{
        const response = await axios.post('http://turnero:3000/getclientes', data2, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Cliente obtenido:', response.status);
    }
    catch(error){
        console.error('Error obteniendo cliente:', error);
        throw new Error('Error obteniendo cliente');
    }
};
