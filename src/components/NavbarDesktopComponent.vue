<template>
  <div class="nav">
    <router-link to="/" class="logo" @click.native="closeMenu">
      <img src="@/assets/logo.jpeg" alt="TheCage Logo" />
    </router-link>
    <span class="nav-links">
      <router-link to="/calendar">Booking Calendar</router-link>
      <a href="https://thecage.com.sg/contact.html" target="_blank">Contact Us</a>
      <router-link to="/signin">Sign In</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'NavbarDesktopComponent',
};
</script>

<style lang="scss" scoped>
// navbar
.nav {
  background-color: whitesmoke;
  overflow: hidden;
  height: $navbarHeight;
  display: inline-block;
  vertical-align: middle;

  .logo {
    display: inline-block;
    height: 100%;
  }

  img {
    height: $navbarHeight;
    padding-left: 24px;
  }

  // links excluding TheCage logo
  .nav-links a {
    $fontSize: $h4;
    @include montserrat($fontSize, 600);
    float: right;
    color: black;
    margin-top: ($navbarHeight - $fontSize) / 2;
    margin-right: 60px;
    text-decoration-line: none;
    line-height: $fontSize;
  }
}
</style>
