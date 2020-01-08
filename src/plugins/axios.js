import axios from 'axios';

function createInstance(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('user-token')}`,
    },
  });
}

const devInstance = createInstance('http://121.6.194.123:5001');
const productionInstance = createInstance('http://121.6.194.123:5001');

export default process.env.NODE_ENV === 'production' ? productionInstance : devInstance;
