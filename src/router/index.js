import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import ForgetPassword from '@/views/ForgetPassword.vue';
import AccountSettings from '@/views/AccountSettings.vue';
import ShoppingCart from '@/views/ShoppingCart.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/resetpassword',
    name: 'forgetpassword',
    component: ForgetPassword,
  },
  {
    path: '/account',
    name: 'accountsettings',
    component: AccountSettings,
  },
  {
    path: '/cart',
    name: 'shoppingcart',
    component: ShoppingCart,
  },
  {
    path: '/calendar',
    name: 'calendar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Calendar.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
