import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification';
import LoadScript from 'vue-plugin-load-script';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import axios from './plugins/axios';
import vuetify from './plugins/vuetify';
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(Vuelidate);
Vue.use(Notifications);
Vue.use(LoadScript);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app');
