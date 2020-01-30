<template>
  <v-app>
    <app-navbar></app-navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <notifications></notifications>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppNavbar from '@/components/Navbar.vue';
import AppFooter from '@/components/Footer.vue';

export default {
  name: 'App',

  components: {
    AppNavbar,
    AppFooter,
  },

  data: () => ({
    //
  }),

  mounted() {
    if (this.$store.state.auth.token) {
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.auth.token}`;
    }
  },
};
</script>

<style lang="scss">
#home {
  h1 {
    @include montserrat(28px, 600);
    margin-bottom: 15px;
  }
  p {
    font-size: 16px !important;
    font-weight: 400;
  }
  @media (max-width: 720px) {
    h1 {
      font-size: 22px;
      margin-bottom: 15px;
    }
    p {
      font-size: 14px !important;
    }
  }
}
.addtocart-dialog{
  width: auto!important;
}
</style>
