<template>
  <div>
    <view-header :main="false">
      Shopping Cart
    </view-header>
    <div class="cart-wrapper">
      <div>
        <shopping-cart-item
          v-for="(item, index) in cartItems"
          :key="index"
          :itemData="item"
          @removeItem="removeCartItem(index)"
        ></shopping-cart-item>
      </div>
      <div class="totals">
        <p>Total: ${{ totalPrice }}</p>
      </div>
      <div class="actions">
        <button id="clear-cart-btn">
          <v-icon size="16px">mdi-trash-can</v-icon><span>Clear Cart</span>
        </button>
        <router-link id="continue-btn" to="/billing">Continue</router-link>
      </div>
      <div class="promo">
        <p class="header">Promotion Code</p>
        <p class="subheader">Have a promotion code? Fill in this field and click apply.</p>
        <form @submit.prevent="fetchPromoDetails">
          <input v-model="promoCodeInput" type="text" />
          <input type="submit" value="Apply" />
        </form>
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
  name: 'ShoppingCart',
  data() {
    return {
      totalPrice: '276.00',
      promoCodeInput: '',
      cartItems: [],
    };
  },
  methods: {
    fetchPromoDetails() {
      // POST promoCodeInput and fetch promo details
      // then apply promo to items in cart
    },
    removeCartItem(index) {
      this.cartItems.splice(index, 1);
    },
  },
  components: {
    ViewHeader,
    ShoppingCartItem,
  },
  mounted() {
    this.cartItems = mockCartItems;
  },
};
</script>

<style lang="scss" scoped>
.cart-wrapper {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 40px auto;

  .totals {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    button {
      @include montserrat($h5, 400);
      padding: 4px 12px;
    }

    #clear-cart-btn {
      background-color: white;
      color: black;
      padding: 4px 8px;
      border: 1px solid $secondary;

      span {
        vertical-align: middle;
        padding-left: 4px;
      }
    }

    #continue-btn {
      background-color: $primary;
      color: white;
      margin-left: 40px;
      padding: 4px 8px;
    }
  }

  .promo {
    p {
      padding: 0;
      margin: 0;
    }

    .header {
      @include montserrat($h3, 500);
    }
    .subheader {
      @include montserrat($h6, 400);
    }

    form {
      padding-top: 20px;
      border-top: 1px solid $secondary;
      display: inline-block;

      input[type="text"] {
        border: 1px solid $secondary;
        vertical-align: middle;
        padding: 2px 4px;
      }

      input[type="submit"] {
        @include montserrat($h5, 500);
        padding: 3.5px 4px;
        border: 1px solid $secondary;
        background-color: whitesmoke;
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }
}
</style>
