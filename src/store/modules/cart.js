/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from '@/plugins/axios';

const state = {
  selectedTimeslots: [],
  productsList: [],
  selectedWithProduct: [],
};

const getters = {
  selected: state => state.selectedTimeslots,
  products: state => state.productsList,
  selectedWithProduct: state => state.selectedWithProduct,
};

const actions = {
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
  copySelectedTimeslots: (state) => {
    state.selectedWithProduct = JSON.parse(JSON.stringify(state.selectedTimeslots));
  },
  removeSelectedWithProduct: (state, index) => {
    state.selectedWithProduct.splice(index, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
