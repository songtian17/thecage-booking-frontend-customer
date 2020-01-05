/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from '@/plugins/axios';

const state = {
  selectedTimeslots: [],
  productsList: [],
};

const getters = {
  selected: state => state.selectedTimeslots,
  products: state => state.productsList,
};

const actions = {
  updateSelected: ({ commit }, arr) => {
    commit('updateSelected', arr);
  },
  clearSelected: ({ commit }) => {
    commit('updateSelected', []);
  },
  fetchProducts: ({ commit }) => {
    axios.get('/products').then((res) => {
      commit('setProductsList', res.data);
    }).catch((err) => {
      console.err(err);
    });
  },
};

const mutations = {
  setSelectedTimeslots: (state, arr) => {
    state.selectedTimeslots = arr;
  },
  clearSelectedTimeslots: (state) => {
    state.selectedTimeslots = [];
  },
  removeSelectedTimeslot: (state, index) => {
    state.selectedTimeslots.splice(index, 1);
  },
  setProductsList: (state, products) => {
    state.productsList = products;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
