import Vue from 'vue';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(Vuelidate);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app');
