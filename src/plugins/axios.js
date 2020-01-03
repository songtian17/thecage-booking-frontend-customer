import axios from 'axios';

function createInstance(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
}

const devInstance = createInstance('http://localhost:5001');
const productionInstance = createInstance('http://localhost:5001');

export default process.env.NODE_ENV === 'production' ? productionInstance : devInstance;
