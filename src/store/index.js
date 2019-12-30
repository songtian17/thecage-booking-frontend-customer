import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import timer from './modules/timer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    timer,
  },
});
