import express, { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config(); 

const app = express();
const port = 8080;

const username ="turnero"; 
const password = "qY#hvVweRlkHp4L8@B"; 

app.get('/api-data', async (req: Request, res: Response) => {
  try {

    const authToken = Buffer.from(`${username}:${password}`).toString('base64');

    const response = await axios.get('http://api.edemsa.local/turnero/getsucursales', {
      headers: {
        'Authorization': `Basic ${authToken}`
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data from API' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
