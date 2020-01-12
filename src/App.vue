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
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,500i,600,700&display=swap");

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
</style>
