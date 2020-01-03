/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import axios from 'axios';
import Vue from 'vue';

const devInstance = createInstance('http://localhost:5001');
const productionInstance = createInstance('http://localhost:5001');

function createInstance(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
}

export default {
  install() {
    if (process.env.NODE_ENV === 'production') {
      Vue.prototype.$axios = productionInstance;
    } else {
      Vue.prototype.$axios = devInstance;
    }
  },
};
