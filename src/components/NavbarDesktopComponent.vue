<template>
  <div class="nav">
    <router-link to="/" class="logo">
      <img src="@/assets/logo.jpeg" alt="TheCage Logo" />
    </router-link>
    <span class="nav-links">
      <router-link to="/calendar">Booking Calendar</router-link>
      <a href="https://thecage.com.sg/contact.html" target="_blank">Contact Us</a>
      <router-link v-if="!isLoggedIn" to="/signin">Sign In</router-link>
      <div v-else class="dropdown">
        <span @click="dropdownExpanded = !dropdownExpanded"
          >{{ user }} <v-icon>mdi-chevron-down</v-icon>
        </span>
        <div v-if="dropdownExpanded" class="dropdown-menu">
          <a class="dropdown-item">Cart</a>
          <router-link to="/account" class="dropdown-item">Account Settings</router-link>
          <a class="dropdown-item">Upcoming Games</a>
          <a class="dropdown-item" @click="logout">Sign Out</a>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'NavbarDesktopComponent',
  data() {
    return {
      dropdownExpanded: 'false',
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    user() {
      return this.$store.getters.currentUser;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// navbar
.nav {
  background-color: whitesmoke;
  height: $navbarHeight;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    margin-left: 24px;
    height: 100%;
  }

  img {
    height: $navbarHeight;
  }

  // links excluding TheCage logo
  .nav-links {
    $fontSize: $h4;
    @include montserrat($fontSize, 600);
    line-height: $fontSize;
    margin-right: 30px;

    a {
      color: black;
      margin: 0 30px;
      text-decoration-line: none;
    }

    .dropdown {
      display: inline-flex;
      cursor: pointer;
      flex-direction: column;
      padding: 0 30px;

      .dropdown-menu {
        position: absolute;
        top: $navbarHeight;
        margin: 0;
        z-index: 10;
        right: 0;
        padding-right: 50px;
        background-color: grey;

        a {
          display: block;
          padding: 0;
        }

        .dropdown-item {
          padding: 8px 0;
          text-align: center;
          @include montserrat($h5, 500);
          width: 100%;
        }
      }
    }
  }
}
</style>
