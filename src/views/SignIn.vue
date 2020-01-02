<template>
  <div>
    <view-header>
      THE CAGE <br />
      BOOKING SYSTEM
    </view-header>
    <div class="container">
      <div class="header">Sign In</div>
      <form @submit.prevent="submitForm">
        <div class="form-group" :class="{ 'form-group--error': $v.formData.email.$error }">
          <label class="form__label" for="email">Email</label>
          <input
            id="email"
            v-model.lazy.trim="formData.email"
            class="form__input"
            type="text"
            @change="$v.formData.email.$touch"
          />
          <div v-if="$v.formData.email.$error">
            <div v-if="!$v.formData.email.required" class="form__error">
              Field is required.
            </div>
            <div v-if="!$v.formData.email.email" class="form__error">
              Enter a valid email address.
            </div>
          </div>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.formData.password.$error }">
          <label class="form__label" for="password">Password</label>
          <input
            id="password"
            v-model.lazy="formData.password"
            class="form__input"
            type="password"
            @change="$v.formData.password.$touch"
          />
          <div v-if="$v.formData.password.$error">
            <div v-if="!$v.formData.password.required" class="form__error">
              Field is required.
            </div>
          </div>
        </div>

        <div class="actions">
          <router-link to="/forgetpassword">Forget Password?</router-link>
          <router-link to="/signup">Sign Up</router-link>
          <input id="submit" type="submit" value="Sign In" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import ViewHeader from '@/components/ViewHeader.vue';

export default {
  name: 'SignIn',
  components: {
    ViewHeader,
  },
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    };
  },
  validations: {
    formData: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store
          .dispatch('login', this.formData)
          .then(() => {
            this.$router.back(1);
          })
          .catch((err) => {
            if (err.response.status === 400) {
              if (err.response.data === 'Login Failed') {
                this.$notify({
                  type: 'error',
                  title: 'Login Failed',
                  text: 'Invalid credentials, try again.',
                });
              }
            }
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@include form-group;

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
}

form {
  padding: 16px;

  .form-group {
    margin-bottom: 8px;
  }

  .form__input {
    width: 100%;
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
</style>
