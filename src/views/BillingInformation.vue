<template>
  <div>
    <view-header :main="false">
      Billing Information
    </view-header>
    <div class="content-wrapper">
      <form @submit.prevent="submit">
        <div class="form-group" :class="{ 'form-group--error': $v.formData.email.$error }">
          <label class="form__label" for="email">Email</label>
          <input
            id="email"
            v-model.lazy="formData.email"
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
            v-model.lazy="formData.name"
            class="form__input"
            type="text"
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
            v-model.lazy="formData.phone"
            class="form__input"
            type="tel"
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
        <div class="actions">
          <button id="return" @click="$router.push('/cart')">
            <v-icon size="18px">mdi-chevron-left</v-icon>
            <span>Return to Cart</span>
          </button>
          <input id="submit" type="submit" value="Confirm" />
        </div>
      </form>
      <div class="order-info">
        <span class="title">Your Order</span>
        <span>Subtotal: </span>
        <span>${{ subtotal.toFixed(2) }}</span>
        <span>Taxes: </span>
        <span>${{ tax.toFixed(2) }}</span>
        <span class="subtitle">Total to pay: </span>
        <span class="subtitle">${{ total.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import ViewHeader from '@/components/ViewHeader.vue';

const phoneNumber = value => /^$|^[8-9][0-9]{7}$/.test(value);

export default {
  name: 'BillingInformation',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
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
    },
  },
  computed: {
    subtotal() {
      return this.$store.state.cart.cartSubtotal;
    },
    tax() {
      return this.$store.state.cart.cartTax;
    },
    total() {
      return this.$store.state.cart.cartTotal;
    },
  },
  components: {
    ViewHeader,
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$router.push('/confirmorder');
      }
    },
    fetchCustomerDetails() {
      this.$axios
        .get(`/customer/${this.$store.getters['auth/userId']}`)
        .then((res) => {
          // eslint-disable-next-line no-shadow
          const { email, name } = res.data;
          const phone = res.data.phone_no;
          this.formData.email = email;
          this.formData.name = name;
          this.formData.phone = phone;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    if (!this.total) {
      this.$router.push('/cart');
    }
    this.fetchCustomerDetails();
  },
};
</script>

<style lang="scss" scoped>
@include form-group;

.content-wrapper {
  width: 80%;
  margin: 40px auto;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;

  form {
    margin-bottom: 40px;
    flex: 1 1 auto;
    .form-group {
      max-width: 750px;
    }
    .form__input {
      width: 100%;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      padding-top: 40px;

      #return {
        @include montserrat($h5, 500);
        background-color: white;
        color: black;
        padding: 10px 25px;
        box-sizing: border-box;
        border: 1px solid #c7c7c7;
        transition: 0.2s linear;
        &:hover {
          background-color: #d2d2d2;
        }
        span {
          padding-left: 4px;
          vertical-align: middle;
        }
      }

      #submit {
        @include montserrat($h5, 500);
        background-color: $primary;
        padding: 10px 25px;
        color: white;
        margin-left: 40px;
        cursor: pointer;
        transition: 0.2s linear;
        &:hover {
          background-color: #c85050;
        }
      }
    }
  }

  .order-info {
    margin-left: auto;
    padding-left: 150px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 40px 20px 20px 30px;
    grid-row-gap: 8px;

    span:not(.title):not(.subtitle) {
      @include montserrat($h5, 400);
    }

    .title {
      @include montserrat($h3, 500);
      font-size: 24px !important;
      font-family: "Montserrat" !important;
      grid-column: span 2;
      border-bottom: 1px solid #c7c7c7;
    }

    .subtitle {
      @include montserrat($h4, 500);
    }
  }
}

@media (max-width: 650px) {
  .content-wrapper {
    width: 95%;
  }
}

@media (max-width: 450px) {
  .content-wrapper form .actions {
    display: block;
  }
  .content-wrapper .actions #return {
    display: block;
    margin: 0 0 15px auto;
  }
  .content-wrapper .actions #submit {
    float: right;
  }
  .content-wrapper {
    .order-info {
      padding-left: 0;

      .title {
        font-size: 20px !important;
      }
      span:not(.title):not(.subtitle) {
        font-size: 12px;
      }
      .subtitle {
        font-size: 14px;
      }
    }
  }
}
</style>
