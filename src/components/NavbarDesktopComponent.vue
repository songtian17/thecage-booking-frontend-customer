<template>
  <div class="nav">
    <router-link to="/" class="logo">
      <img src="@/assets/logo.jpeg" alt="TheCage Logo" />
    </router-link>
    <span class="nav-links">
      <a href="https://thecage.com.sg/contact.html" target="_blank">Contact Us</a>
      <router-link v-if="!isLoggedIn" to="/signin">Sign In</router-link>
      <div v-else class="dropdown">
        <span style="user-select:none;" @click="dropdownExpanded = !dropdownExpanded"
          >{{ user }} <v-icon>mdi-chevron-down</v-icon>
        </span>
        <transition name="scale-in">
          <div v-if="dropdownExpanded" class="dropdown-menu">
            <router-link to="/cart" class="dropdown-item">Cart</router-link>
            <router-link to="/account" class="dropdown-item">Account Settings</router-link>
            <router-link to="/upcominggames" class="dropdown-item">Upcoming Games</router-link>
            <a class="dropdown-item" @click="logout">Sign Out</a>
          </div></transition
        >
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'NavbarDesktopComponent',
  data() {
    return {
      dropdownExpanded: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    user() {
      return this.$store.getters['auth/currentUser'];
    },
  },
  methods: {
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
  watch: {
    $route() {
      this.dropdownExpanded = false;
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
    margin-left: 60px;
    height: 100%;
  }

  img {
    height: 60px;
    margin: 4px 0;
  }

  // links excluding TheCage logo
  .nav-links {
    $fontSize: $h4;
    @include montserrat($fontSize, 600);
    line-height: $fontSize;
    margin-right: 60px;

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
        padding: 13px 0;
        padding-right: 70px;
        background-color: #d2d2d2;

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

// --- scale-in transition ---
.scale-in-enter-active {
  animation: scale-in-ver-top 0.3s;
}

.scale-in-leave-active {
  animation: scale-in-ver-top 0.3s reverse;
}

@include animation-scale-in;
// --- end of scale-in transition ---
</style>
