<template>
  <navbar-mobile-component v-if="isMobile"></navbar-mobile-component>
  <navbar-desktop-component v-else></navbar-desktop-component>
</template>

<script>
import NavbarMobileComponent from '@/components/NavbarMobileComponent.vue';
import NavbarDesktopComponent from '@/components/NavbarDesktopComponent.vue';

export default {
  name: 'Navbar',
  components: {
    NavbarMobileComponent,
    NavbarDesktopComponent,
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.width <= 720;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
</style>
