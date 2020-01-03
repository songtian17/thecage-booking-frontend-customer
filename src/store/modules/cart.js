/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  selectedTimeslots: [],
};

const getters = {
  selected: state => state.selectedTimeslots,
};

const actions = {
  updateSelected: ({ commit }, arr) => {
    commit('updateSelected', arr);
  },
  clearSelected: ({ commit }) => {
    commit('updateSelected', []);
  },
};

const mutations = {
  setSelectedTimeslots: (state, arr) => {
    state.selectedTimeslots = arr;
  },
  clearSelectedTimeslots: (state) => {
    state.selectedTimeslots = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
