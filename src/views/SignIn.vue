<template>
  <div>
    <view-header>
      THE CAGE <br />
      BOOKING SYSTEM
    </view-header>
    <div class="container">
      <div class="header">Sign In</div>
      <form @submit.prevent="submitForm">
        <label for="email">Email</label>
        <br />
        <input id="email" v-model="email" type="text" name="email" />
        <br />
        <label for="password">Password</label>
        <br />
        <input id="password" v-model="password" type="password" name="password" />
        <br />
        <div class="actions">
          <router-link to="/resetpassword">Forget Password?</router-link>
          <router-link to="/signup">Sign Up</router-link>
          <input id="submit" type="submit" value="Sign In" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ViewHeader from '@/components/ViewHeader.vue';

export default {
  name: 'SignIn',
  components: {
    ViewHeader,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch('login', { user: this.email, password: this.password }).then(() => {
        this.$router.back(1);
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  @media screen and (max-width: 400px) {
    width: 100%;
    border-radius: 0px;
    box-shadow: none;
  }

  margin: 40px auto;
  width: 400px;
  padding: 0;
  border-radius: 4px;
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14),
    0px 5px 22px 4px rgba(0, 0, 0, 0.12);

  .header {
    @media screen and (max-width: 400px) {
      background-color: white;
      color: black;
      padding: 0;
      margin: 16px;
      margin-bottom: 0;
      padding-bottom: 6px;
      border-bottom: 1px solid $secondary;
    }

    background-color: $primary;
    color: white;
    padding: 16px;
    @include montserrat($h3, 600);
  }

  form {
    padding: 16px;

    label {
      @include montserrat($h5, 400);
    }

    input:not(#submit) {
      border: 1px solid $secondary;
      margin-top: 4px;
      margin-bottom: 12px;
      width: 100%;
      padding: 4px 6px;
    }

    .actions {
      overflow: auto;

      a {
        @media screen and (max-width: 400px) {
          margin-right: 10px;
          @include montserrat($h6, 500);
        }

        margin-right: 24px;
        padding-top: 6px;
        display: inline-block;
        text-decoration: none;
        color: #428bca;
        @include montserrat($h5, 500);
      }

      #submit {
        background-color: $primary;
        color: white;
        padding: 6px 12px;
        border-radius: 4px;
        float: right;
        @include montserrat($h4, 500);
        cursor: pointer;
      }
    }
  }
}
</style>
