import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

function createInstance(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

const devInstance = createInstance(process.env.VUE_APP_API);
const productionInstance = createInstance(process.env.VUE_APP_API);

export default process.env.NODE_ENV === 'production' ? productionInstance : devInstance;
