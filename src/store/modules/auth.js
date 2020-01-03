/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from 'axios';

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
  user: localStorage.getItem('user-name') || '',
  userId: localStorage.getItem('user-id') || '',
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  currentUser: state => state.user,
  userId: state => state.userId,
};

const actions = {
  login: ({ commit }, credentials) => new Promise((resolve, reject) => {
    commit('authRequest');
    axios
      .post(`${process.env.VUE_APP_API}/signin`, credentials)
      .then((resp) => {
        const { token, user, userId } = resp.data;
        localStorage.setItem('user-token', token);
        localStorage.setItem('user-name', user || 'User');
        localStorage.setItem('user-id', userId);
        axios.defaults.headers.common.Authorization = token;
        commit('authSuccess', { token, user, userId });
        resolve(resp);
      })
      .catch((err) => {
        commit('authError');
        localStorage.removeItem('user-token');
        localStorage.removeItem('user-name');
        reject(err);
      });
  }),
  logout: ({ commit }) => new Promise((resolve) => {
    commit('logout');
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-name');
    delete axios.defaults.headers.common.Authorization;
    resolve();
  }),
};

const mutations = {
  authRequest: (state) => {
    state.status = 'loading';
  },
  authSuccess: (state, { token, user, userId }) => {
    state.status = 'success';
    state.token = token;
    state.user = user;
    state.userId = userId;
  },
  authError: (state) => {
    state.status = 'error';
  },
  logout: (state) => {
    state.status = '';
    state.token = '';
    state.user = {};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
