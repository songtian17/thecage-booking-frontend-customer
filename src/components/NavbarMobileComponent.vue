<template>
  <div class="nav">
    <router-link to="/" class="logo" @click.native="closeMenu">
      <img src="@/assets/logo.jpeg" alt="TheCage Logo" />
    </router-link>
    <div class="nav-icon" :class="{ active: menuActive }" @click="menuActive = !menuActive">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </div>
    <transition name="scale-in">
      <div v-if="menuActive" class="menu">
        <router-link to="/calendar" @click.native="closeMenu">Booking Calendar</router-link>
        <a href="https://thecage.com.sg/contact.html" target="_blank" @click="closeMenu">Contact Us</a>
        <router-link to="/signin" @click.native="closeMenu">Sign In</router-link>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'NavbarMobileComponent',
  data() {
    return {
      menuActive: false,
    };
  },
  methods: {
    closeMenu() {
      if (this.menuActive) {
        this.menuActive = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// $navbarHeight: 68px;

// hamburger menu icon
.nav-icon {
  height: 40px;
  width: 40px;
  float: right;
  margin: 15px 30px;

  .line {
    width: 30px;
    height: 5px;
    display: block;
    background-color: black;
    border-radius: 3px;
    margin: 5px auto;
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    cursor: pointer;
  }

  &.active .line:nth-child(1) {
    transform: translateY(10px) rotate(45deg);
  }

  &.active .line:nth-child(2) {
    transform: scale(0);
  }

  &.active .line:nth-child(3) {
    transform: translateY(-10px) rotate(-45deg);
  }
}

// --- scale-in transition ---
.scale-in-enter-active {
  animation: scale-in-ver-top 0.3s;
}

.scale-in-leave-active {
  animation: scale-in-ver-top 0.3s reverse;
}

@include animation-scale-in;
// --- end of scale-in transition ---

// mobile menu
.menu {
  position: absolute;
  top: $navbarHeight;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: white;

  a {
    @include montserrat($h3, 500, italic);
    text-decoration-line: none;
    display: block;
    padding: 24px;
    margin: 1px 0;
    width: 100%;
    background-color: $primary;
    color: white;
  }
}

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
}
</style>
