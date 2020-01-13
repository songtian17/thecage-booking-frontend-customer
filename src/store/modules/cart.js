/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from '@/plugins/axios';

const state = {
  selectedTimeslots: [],
  productsList: [],
  selectedWithProduct: [],
  cartTotal: 0,
  cartSubtotal: 0,
  cartTax: 0,
};

const getters = {
  selected: state => state.selectedTimeslots,
  products: state => state.productsList,
  selectedWithProduct: state => state.selectedWithProduct,
};

const actions = {
  fetchProducts: ({ commit }) => {
    axios
      .get('/products')
      .then((res) => {
        commit('setProductsList', res.data);
      })
      .catch((err) => {
        console.err(err);
      });
  },
  calculateCartPrices: ({ commit }, cartItems) => {
    console.log('cart/calculateCartPrices');
    const taxRate = 7 / 100;
    // console.log(commit, cartItems);
    const total = cartItems
      .reduce((acc, cur) => acc + parseFloat(cur.discountAmount), 0);
    commit('setCartTotal', total);
    const totalx100 = total * 100;
    const tax = Math.round(totalx100 * taxRate);
    commit('setCartTax', tax / 100);
    const subtotal = totalx100 - tax;
    commit('setCartSubtotal', subtotal / 100);
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
  setCartTotal: (state, total) => {
    state.cartTotal = total;
  },
  setCartSubtotal: (state, subtotal) => {
    state.cartSubtotal = subtotal;
  },
  setCartTax: (state, tax) => {
    state.cartTax = tax;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
