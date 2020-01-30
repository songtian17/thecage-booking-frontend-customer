import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import SignIn from '@/views/SignIn.vue';

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
    component: () => import(/* webpackChunkName: "SignUp" */ '../views/SignUp.vue'),
  },
  {
    path: '/forgetpassword',
    name: 'forgetpassword',
    component: () => import(/* webpackChunkName: "ForgetPassword" */ '../views/ForgetPassword.vue'),
  },
  {
    path: '/resetpassword',
    name: 'resetpassword',
    component: () => import(/* webpackChunkName: "ResetPassword" */ '../views/ResetPassword.vue'),
  },
  {
    path: '/account',
    name: 'accountsettings',
    component: () => import(/* webpackChunkName: "AccountSettings" */ '../views/AccountSettings.vue'),
  },
  {
    path: '/cart',
    name: 'shoppingcart',
    component: () => import(/* webpackChunkName: "ShoppingCart" */ '../views/ShoppingCart.vue'),
  },
  {
    path: '/billing',
    name: 'billinginfo',
    component: () => import(/* webpackChunkName: "BillingInformation" */ '../views/BillingInformation.vue'),
  },
  {
    path: '/confirmorder',
    name: 'confirmorder',
    component: () => import(/* webpackChunkName: "ConfirmOrder" */ '../views/ConfirmOrder.vue'),
  },
  {
    path: '/upcominggames',
    name: 'upcominggames',
    component: () => import(/* webpackChunkName: "UpcomingGames" */ '../views/UpcomingGames.vue'),
  },
  {
    path: '/calendar/:id',
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
