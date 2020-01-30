/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import axios from '@/plugins/axios';

const state = {
  topAnnouncement: null,
  bottomAnnouncement: null,
  venues: null,
};

const getters = {
  isAnnouncementsNull: state => state.topAnnouncement === null && state.bottomAnnouncement === null,
  isVenuesNull: state => state.venues === null,
  topAnnouncement: state => state.topAnnouncement,
  bottomAnnouncement: state => state.bottomAnnouncement,
  venues: state => state.venues,
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
  fetchVenues: ({ commit }) => new Promise((resolve, reject) => {
    axios
      .get('/venues')
      .then((res) => {
        const { data } = res;
        const venues = data.map(venue => Object.assign(venue, { active: false }));
        commit('setVenues', venues);
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
  setVenues: (state, venues) => {
    state.venues = venues;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
