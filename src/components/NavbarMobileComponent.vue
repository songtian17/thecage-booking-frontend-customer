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
      <div v-if="menuActive" class="menu" @click="closeMenu">
        <a href="https://thecage.com.sg/contact.html" target="_blank" @click="closeMenu"
          >Contact Us</a
        >
        <router-link v-if="!isLoggedIn" to="/signin">Sign In</router-link>
        <span v-else>
          <router-link to="/cart">Cart</router-link>
          <router-link to="/account">Account Settings</router-link>
          <router-link to="/upcominggames">Upcoming Games</router-link>
          <a @click="logout">Sign Out</a>
        </span>
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
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isAuthenticated'];
    },
  },
  methods: {
    closeMenu() {
      if (this.menuActive) {
        this.menuActive = false;
      }
    },
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$store.dispatch('timer/clearTimer');
        this.$notify({
          type: 'success',
          text: 'Signed out successfully',
        });
        this.$router.push('/');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// hamburger menu icon
.nav-icon {
  float: right;
  margin: 15px 30px;

  .line {
    width: 25px;
    height: 2px;
    display: block;
    background-color: black;
    border-radius: 3px;
    margin: 4px auto;
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    cursor: pointer;
  }

  &.active .line:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }

  &.active .line:nth-child(2) {
    transform: scale(0);
  }

  &.active .line:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
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
  top: 60px;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: white;

  a {
    @include montserrat($h5, 500, italic);
    text-decoration-line: none;
    display: block;
    padding: 12px 20px;
    margin: 1px 0;
    width: 100%;
    background-color: $primary;
    color: white;
  }
}

// navbar
.nav {
  background-color: whitesmoke;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    margin-left: 20px;
    height: 100%;
  }

  img {
    height: 50px;
    margin: 5px 0;
  }
}
</style>
