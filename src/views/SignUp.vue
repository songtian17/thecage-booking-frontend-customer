<template>
  <div>
    <view-header>
      THE CAGE <br />
      BOOKING SYSTEM
    </view-header>
    <div class="container">
      <div class="header">Sign Up</div>
      <form @submit.prevent="submitForm">
        <div class="form-group" :class="{ 'form-group--error': $v.formData.email.$error }">
          <label class="form__label" for="email">Email</label>
          <input
            id="email"
            v-model.lazy.trim="formData.email"
            class="form__input"
            type="email"
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

        <div class="form-group" :class="{ 'form-group--error': $v.formData.name.$error }">
          <label class="form__label" for="name">Name</label>
          <input
            id="name"
            v-model.lazy.trim="formData.name"
            class="form__input"
            type="name"
            @change="$v.formData.name.$touch"
          />
          <div v-if="$v.formData.name.$error">
            <div v-if="!$v.formData.name.required" class="form__error">
              Field is required.
            </div>
          </div>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.formData.phone.$error }">
          <label class="form__label" for="phone">Phone Number</label>
          <input
            id="phone"
            v-model.lazy.trim="formData.phone"
            class="form__input"
            type="phone"
            @change="$v.formData.phone.$touch"
          />
          <div v-if="$v.formData.phone.$error">
            <div v-if="!$v.formData.phone.required" class="form__error">
              Field is required.
            </div>
            <div v-if="!$v.formData.phone.phoneNumber" class="form__error">
              Enter a valid phone number.
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

        <div class="form-group" :class="{ 'form-group--error': $v.formData.password2.$error }">
          <label class="form__label" for="password2">Confirm Password</label>
          <input
            id="password2"
            v-model.lazy="formData.password2"
            class="form__input"
            type="password"
            @change="$v.formData.password2.$touch"
          />
          <div v-if="$v.formData.password2.$error">
            <div v-if="!$v.formData.password2.required" class="form__error">
              Field is required.
            </div>
            <div v-if="!$v.formData.password2.sameAsPassword" class="form__error">
              Passwords must match
            </div>
          </div>
        </div>

        <div class="actions">
          <input id="submit" type="submit" value="Sign Up" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators';
import ViewHeader from '@/components/ViewHeader.vue';

const phoneNumber = value => /^$|^[8-9][0-9]{7}$/.test(value);

export default {
  name: 'SignUp',
  data() {
    return {
      formData: {
        email: '',
        name: '',
        phone: '',
        password: '',
        password2: '',
      },
    };
  },
  validations: {
    formData: {
      email: {
        required,
        email,
      },
      name: {
        required,
      },
      phone: {
        required,
        phoneNumber,
      },
      password: {
        required,
      },
      password2: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  components: {
    ViewHeader,
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$axios
          .post(`${process.env.VUE_APP_API}/signup`, {
            email: this.email,
            username: this.name,
            phone: this.phone,
            password: this.password,
          })
          .then(() => {
            this.$router.push('/');
          })
          .catch((err) => {
            console.log(err);
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

  .form__input {
    width: 100%;
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
</style>
