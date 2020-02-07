/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  defaultTimings: [
    { time: '00:00', hours: 1 },
    { time: '01:00', hours: 1 },
    { time: '02:00', hours: 1 },
    { time: '03:00', hours: 1 },
    { time: '04:00', hours: 1 },
    { time: '05:00', hours: 1 },
    { time: '06:00', hours: 1 },
    { time: '07:00', hours: 1 },
    { time: '08:00', hours: 1 },
    { time: '09:00', hours: 1 },
    { time: '10:00', hours: 1 },
    { time: '11:00', hours: 1 },
    { time: '12:00', hours: 1 },
    { time: '13:00', hours: 1 },
    { time: '14:00', hours: 1 },
    { time: '15:00', hours: 1 },
    { time: '16:00', hours: 1 },
    { time: '17:00', hours: 1 },
    { time: '18:00', hours: 1 },
    { time: '19:00', hours: 1 },
    { time: '20:00', hours: 1 },
    { time: '21:00', hours: 1 },
    { time: '22:00', hours: 1 },
    { time: '23:00', hours: 1 },
  ],
  themeColor: '',
  themeActiveColor: '',
  timings: '',
  pitches: '',
};

const getters = {
  style: state => ({ themeColor: state.themeColor, themeActiveColor: state.themeActiveColor }),
};

const actions = {
  setCustomTimeslots: ({ commit, state }, customTimeslots) => {
    const newTimings = [...state.defaultTimings];
    if (!customTimeslots) {
      commit('setTimings', newTimings);
      return;
    }
    customTimeslots.forEach((ct) => {
      const i = newTimings.findIndex(t => t.time.split(':')[0] === ct.start_time.split(':')[0]);
      newTimings.splice(i, ct.duration, {
        time: ct.start_time.slice(0, 5),
        hours: ct.duration,
      });
    });
    commit('setTimings', newTimings);
  },
};

const mutations = {
  setThemeColor: (state, themeColor) => {
    state.themeColor = themeColor;
  },
  setThemeActiveColor: (state, themeActiveColor) => {
    state.themeActiveColor = themeActiveColor;
  },
  setTimings: (state, timings) => {
    state.timings = timings;
  },
  setPitches: (state, pitches) => {
    state.pitches = pitches;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
