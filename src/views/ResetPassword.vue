<template>
  <div>
    <view-header>
      THE CAGE <br />
      BOOKING SYSTEM
    </view-header>
    <div class="container">
      <div class="header">Reset Password</div>
      <form v-if="isValidToken && !isResetSuccess" @submit.prevent="submit">
        <p>Please enter and confirm your new password.</p>
        <label for="password">Password</label>
        <br />
        <input id="password" v-model="password" type="password" name="password" />
        <br />
        <label for="confirm-pass">Confirm Password</label>
        <br />
        <input
          id="confirm-pass"
          v-model="confirmPassword"
          type="confirm-pass"
          name="confirm-pass"
        />
        <br />
        <div class="actions">
          <input id="submit" type="submit" value="Reset Password" />
        </div>
      </form>
      <div v-else-if="isValidToken && isResetSuccess" class="info-text">
        Your password has been successfully reset.
      </div>
      <div v-else class="info-text">
        {{ tokenInvalidMessage }}
        <br />
        <button v-if="tokenInvalidMessage">Click here if you're not redirected</button>
      </div>
    </div>
  </div>
</template>

<script>
import ViewHeader from '@/components/ViewHeader.vue';

export default {
  name: 'ResetPassword',
  data() {
    return {
      userToken: '',
      password: '',
      confirmPassword: '',
      isResetSuccess: false,
      isValidToken: false,
      tokenInvalidMessage: '',
    };
  },
  components: {
    ViewHeader,
  },
  methods: {
    submit() {
      this.$axios
        .post('/resetpassword', {
          password: this.password,
          token: this.userToken,
        })
        .then(() => {
          this.isResetSuccess = true;
        });
    },
    verifyTokenValidity() {
      this.userToken = this.$route.query.token;
      if (!this.userToken) {
        this.isValidToken = false;
        this.tokenInvalidMessage = 'You do not have a token to reset your password. Redirecting you to home page in 5 seconds...';
        setTimeout(() => this.$router.push('/'), 5000);
      }
      this.$axios
        .get(`/validatetoken?token=${this.userToken}`)
        .then((res) => {
          console.log(res);
          if (res.data.message === 'success') {
            this.isValidToken = true;
          }
        })
        .catch((err) => {
          this.isValidToken = false;
          const responseMessage = err.response.data.message;
          if (responseMessage === 'Expired link') {
            this.tokenInvalidMessage = 'Your reset password link has expired. Redirecting you to home page page in 5 seconds...';
            setTimeout(() => this.$router.push('/'), 5000);
          } else if (responseMessage === 'Invalid link') {
            this.tokenInvalidMessage = 'You do not have a valid token. Redirecting you to home page in 5 seconds...';
            setTimeout(() => this.$router.push('/'), 5000);
          }
        });
    },
  },
  mounted() {
    this.verifyTokenValidity();
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 40px auto;
  width: 400px;
  padding: 0;
  border-radius: 4px;
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14),
    0px 5px 22px 4px rgba(0, 0, 0, 0.12);

  .info-msg{
    @include montserrat($h5, 400);
  }
  .header {
    background-color: $primary;
    color: white;
    padding: 15px 20px;
    @include montserrat($h3, 600);
  }

  form {
    padding: 20px;

    label {
      @include montserrat($h5, 400);
    }

    input:not(#submit) {
      @include montserrat($h5, 400);
      border: 1px solid $secondary;
      margin-top: 5px;
      margin-bottom: 20px;
      width: 100%;
      padding: 4px 6px;
    }

    .actions {
      overflow: auto;

      #submit {
        background-color: $primary;
        color: white;
      padding: 10px 25px;
      float: right;
      @include montserrat($h5, 500);
        cursor: pointer;
        transition: 0.2s linear;
      }
      #submit:hover {
        background-color: #c85050;
      }
    }
  }

  .info-text {
    @include montserrat($h5, 400);
    padding: 16px;
  }
}

@media (max-width: 720px) {
  .container {
    width: 100%;
    border-radius: 0px;
    box-shadow: none;
    .header {
      background-color: white;
      color: black;
      padding: 0;
      margin: 16px;
      margin-bottom: 0;
      padding-bottom: 6px;
      border-bottom: 1px solid $secondary;
    }
  }
  form .actions a {
    margin-right: 10px;
    @include montserrat($h6, 500);
  }
}
</style>
