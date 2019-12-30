<template>
  <div>
    <view-header>
      THE CAGE <br />
      BOOKING SYSTEM
    </view-header>
    <div class="container">
      <div class="header">Forget Password</div>
      <form v-if="!isEmailSent" @submit.prevent="submit">
        <p>Please enter your email address associated with your account.</p>
        <label for="email">Email</label>
        <br />
        <input id="email" v-model="email" type="email" name="email" />
        <br />
        <div class="actions">
          <input id="submit" type="submit" value="Reset Password" />
        </div>
      </form>
      <div v-else class="info-text">
        An email to reset your password has been sent to your email address. Click on the link in
        the email to reset your password. If you do not see the email, remember to check your spam
        folder.
      </div>
    </div>
  </div>
</template>

<script>
import ViewHeader from '@/components/ViewHeader.vue';

export default {
  name: 'ForgetPassword',
  data() {
    return {
      email: '',
      isEmailSent: false,
    };
  },
  components: {
    ViewHeader,
  },
  methods: {
    submit() {
      this.$axios.post(`${process.env.VUE_APP_API}/forgetpassword`, { email: this.email }).then(() => {
        this.isEmailSent = true;
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

  .info-text {
    @include montserrat($h5, 400);
    padding: 16px;
  }
}
</style>
