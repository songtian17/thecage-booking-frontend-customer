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
          <button id="return">
            <v-icon size="16px">mdi-chevron-left</v-icon>
            <span>Return to Cart</span>
          </button>
          <input id="submit" type="submit" value="Confirm" />
        </div>
      </form>
      <div class="order-info">
        <span class="title">Your Order</span>
        <span>Subtotal</span>
        <span>${{ subtotal }}</span>
        <span>Taxes</span>
        <span>${{ taxes }}</span>
        <span class="subtitle">Total to pay</span>
        <span class="subtitle">${{ total }}</span>
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
  props: {
    subtotal: {
      type: String,
      default: '93.00',
    },
    taxes: {
      type: String,
      default: '7.00',
    },
    total: {
      type: String,
      default: '100.00',
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
        padding: 4px 8px;
        box-sizing: border-box;
        border: 1px solid $secondary;

        span {
          padding-left: 4px;
          vertical-align: middle;
          line-height: 1;
        }
      }

      #submit {
        @include montserrat($h5, 500);
        background-color: $primary;
        color: white;
        padding: 4px 8px;
        margin-left: 40px;
        cursor: pointer;
      }
    }
  }

  .order-info {
    margin-left: auto;
    padding-left: 20%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 40px 20px 20px 30px;
    grid-row-gap: 8px;

    span:not(.title):not(.subtitle) {
      @include montserrat($h6, 400);
    }

    .title {
      @include montserrat($h3, 500);
      grid-column: span 2;
      border-bottom: 1px solid $secondary;
    }

    .subtitle {
      @include montserrat($h4, 400);
    }
  }
}
</style>
