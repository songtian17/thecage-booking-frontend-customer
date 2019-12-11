/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
  user: {},
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  currentUser: state => state.user,
};

const actions = {
  login: ({ commit }, credentials) => new Promise((resolve, reject) => {
    commit('authRequest');
    axios.post(`${process.env.VUE_APP_API}/login`, credentials).then((resp) => {
      const { token, user } = resp.data;
      localStorage.setItem('user-token', token);
      axios.defaults.headers.common.Authorization = token;
      commit('authSuccess', { token, user });
      resolve(resp);
    }).catch((err) => {
      commit('authError');
      localStorage.removeItem('user-token');
      reject(err);
    });
  }),
};

const mutations = {
  authRequest: (state) => {
    state.status = 'loading';
  },
  authSuccess: (state, { token, user }) => {
    state.status = 'success';
    state.token = token;
    state.user = user;
  },
  authError: (state) => {
    state.status = 'error';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
