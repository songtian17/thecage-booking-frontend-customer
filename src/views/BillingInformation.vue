<template>
  <div>
    <view-header :main="false">
      Billing Information
    </view-header>
    <div class="content-wrapper">
      <form @submit.prevent="submit">
        <label for="name">Name</label>
        <input id="name" v-model="name" type="text" name="name" />
        <label for="email">Email</label>
        <input v-model="email" type="text" name="email" />
        <label for="phone">Phone</label>
        <input v-model="phone" type="text" name="phone" />
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
import ViewHeader from '@/components/ViewHeader.vue';

export default {
  name: 'BillingInformation',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
    };
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
      this.$router.push('/confirmorder');
    },
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 60%;
  margin: 40px auto;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;

  form {
    min-width: 60%;
    margin-bottom: 40px;

    label {
      @include montserrat($h5, 400);
      display: block;
    }

    input[type="text"] {
      border: 1px solid $secondary;
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
