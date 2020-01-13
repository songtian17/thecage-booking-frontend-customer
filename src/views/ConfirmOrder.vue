<template>
  <div>
    <view-header :main="false">
      Validate Booking Order
    </view-header>
    <div class="content-wrapper">
      <shopping-cart-item
        v-for="(item, index) in cartItems"
        :key="index"
        :itemData="item"
        :displayOnly="true"
      ></shopping-cart-item>
      <div class="bottom-wrapper">
        <div class="left">
          <div class="payment">
            <span class="title">Payment method:</span>
            <input id="paypal" type="radio" name="payment" value="Paypal" />
            <span>Paypal</span>
          </div>
          <div class="billing">
            <span class="title">Bill to:</span>
            <span>John Tan</span>
            <span>98765432</span>
            <span>johntan@email.com</span>
            <a href="">Change address ></a>
          </div>
        </div>
        <div class="right">
          <span>Total: ${{ total.toFixed(2) }}</span>
          <span>Taxes: ${{ tax.toFixed(2) }}</span>
          <button id="payment-btn">Pay Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ViewHeader from '@/components/ViewHeader.vue';
import ShoppingCartItem from '@/components/ShoppingCartItem.vue';

const mockCartItems = [
  {
    venue: 'Kallang',
    field: '5-A-Side',
    pitch: 'Pitch 4',
    timeStart: '22/10/2019 15:00',
    timeEnd: '22/10/2019 17:00',
    product: 'Online Premium',
    amount: '92.00',
    discountedAmount: '90.00',
  },
];
export default {
  name: 'ConfirmOrder',
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    tax() {
      return this.$store.state.cart.cartTax;
    },
    total() {
      return this.$store.state.cart.cartTotal;
    },
  },
  components: {
    ViewHeader,
    ShoppingCartItem,
  },
  mounted() {
    if (!this.total) {
      this.$router.push('/cart');
    }
    this.cartItems = mockCartItems;
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 40px auto;

  .bottom-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;

    .payment {
      margin-bottom: 40px;
      .title {
        @include montserrat($h3, 400);
        display: block;
      }
    }

    .billing {
      .title {
        @include montserrat($h3, 400);
      }

      span {
        @include montserrat($h4, 400);
        display: block;
      }
    }

    .right {
      text-align: right;

      span {
        display: block;
      }
    }

    #payment-btn {
      @include montserrat($h5, 400);
      padding: 4px 8px;
      background-color: $primary;
      color: white;
      margin-top: 20px;
    }
  }
}
</style>
