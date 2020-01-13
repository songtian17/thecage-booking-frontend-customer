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
          .dispatch('auth/login', this.formData)
          .then((res) => {
            this.$notify({
              type: 'success',
              text: `Logged in as ${res.data.user}`,
            });
            this.$router.push('/');
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
  margin: 40px auto;
  width: 450px;
  padding: 0;
  border-radius: 4px;
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14),
    0px 5px 22px 4px rgba(0, 0, 0, 0.12);

  .header {
    background-color: $primary;
    color: white;
    padding: 15px 20px;
    @include montserrat($h3, 600);
  }
}

form {
  padding: 20px;

  .form__input {
    width: 100%;
  }

  .actions {
    overflow: auto;

    a {
      margin-right: 24px;
      padding-top: 15px;
      display: inline-block;
      text-decoration: none;
      color: #428bca;
      @include montserrat($h6, 500);
      transition: 0.2s linear;
    }

    #submit {
      background-color: $primary;
      color: white;
      padding: 10px 25px;
      float: right;
      @include montserrat($h5, 500);
      cursor: pointer;
      transition: 0.2s linear;
    }
    a:hover {
      color: #115aac;
    }
    #submit:hover {
      background-color: #c85050;
    }
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
