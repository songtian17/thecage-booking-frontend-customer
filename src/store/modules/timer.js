/* eslint no-shadow: ["error", { "allow": ["state", getters] }] */
const state = {
  deadline: '',
  timerID: '',
  countdown: '',
  total: '',
};

const getters = {
  countdown: state => state.countdown,
  isTimeUp: state => state.total <= 0,
};

const actions = {
  startTimer: ({ commit, getters }) => {
    commit('newDeadline');
    commit(
      'setTimer',
      window.setInterval(() => {
        commit('setTimerValues');
        if (getters.isTimeUp) {
          commit('clearTimer');
        }
      }),
    );
  },
  clearTimer: ({ commit }) => {
    commit('clearTimer');
  },
};

const mutations = {
  newDeadline: (state) => {
    const now = new Date();
    state.deadline = new Date(now.getTime() + 20 * 60000);
  },
  setTimer: (state, func) => {
    state.timerID = func;
  },
  clearTimer: (state) => {
    clearInterval(state.timerID);
    state.timerID = '';
    state.deadline = '';
    state.countdown = '';
    state.total = '';
  },
  setTimerValues: (state) => {
    if (!state.deadline) {
      return;
    }
    const now = new Date();
    const msDiff = state.deadline.getTime() - now.getTime();
    const m = Math.floor(msDiff / 1000 / 60);
    const s = Math.floor((msDiff / 1000) % 60);
    state.total = msDiff;
    const minutes = m < 10 ? `0${String(m)}` : m;
    const seconds = s < 10 ? `0${String(s)}` : s;
    state.countdown = `${minutes}:${seconds}`;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
