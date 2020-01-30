/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from '@/plugins/axios';

const state = {
  topAnnouncement: null,
  bottomAnnouncement: null,
};

const getters = {
  isEmpty: state => state.topAnnouncement === null && state.bottomAnnouncement === null,
  topAnnouncement: state => state.topAnnouncement,
  bottomAnnouncement: state => state.bottomAnnouncement,
};

const actions = {
  fetchAnnouncements: ({ commit }) => new Promise((resolve, reject) => {
    axios
      .get('/announcement')
      .then((res) => {
        const { data } = res;
        data.forEach((announcement) => {
          const text = announcement.visibility ? announcement.html_string : '';
          if (announcement.placement === 'Top') {
            commit('setTopAnnouncement', text);
          } else if (announcement.placement === 'Bottom') {
            commit('setBottomAnnouncement', text);
          }
        });
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  }),
};

const mutations = {
  setTopAnnouncement: (state, announcement) => {
    state.topAnnouncement = announcement;
  },
  setBottomAnnouncement: (state, announcement) => {
    state.bottomAnnouncement = announcement;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
