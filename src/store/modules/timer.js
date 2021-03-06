/* eslint no-shadow: ["error", { "allow": ["state", getters] }] */
import axios from '@/plugins/axios';
import router from '@/router/index';

const state = {
  deadline: '',
  timerID: '',
  countdown: '',
  total: '',
};

const getters = {
  countdown: state => state.countdown,
  isTimeUp: state => state.total <= 0,
  isActive: state => state.deadline !== '',
};

const actions = {
  startTimer: ({ dispatch, commit, getters }) => {
    commit('newDeadline');
    commit(
      'setTimer',
      window.setInterval(() => {
        commit('setTimerValues');
        if (getters.isTimeUp) {
          dispatch('clearCart');
          commit('clearTimer');
        }
      }),
    );
  },
  clearTimer: ({ commit }) => {
    commit('clearTimer');
  },
  clearCart: () => {
    axios
      .delete('/cartitem')
      .then(() => {
        router.push('/');
        this.$notify({
          type: 'warning',
          text: 'Cart has been cleared due to inactivity.',
        });
      });
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
