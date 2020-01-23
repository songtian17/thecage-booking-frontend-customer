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
          @removeItem="removeCartItem(index, item.id)"
        ></shopping-cart-item>
      </div>
      <div class="totals">
        <p>Total: ${{ totalPrice.toFixed(2) }}</p>
      </div>
      <div class="actions">
        <button id="clear-cart-btn" @click="clearCart">
          <v-icon size="18px">mdi-trash-can</v-icon><span>Clear Cart</span>
        </button>
        <button id="continue-btn" @click="navigateToBilling">Continue</button>
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

export default {
  name: 'ShoppingCart',
  data() {
    return {
      promoCodeInput: '',
      cartItems: [],
    };
  },
  methods: {
    fetchCartItems() {
      this.$axios
        .get('/cartitem')
        .then((res) => {
          console.log(res);
          this.cartItems = res.data.items;
          if (this.cartItems.length && !this.$store.getters['timer/isActive']) {
            this.$store.dispatch('timer/startTimer');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeCartItem(index, itemId) {
      this.$axios
        .delete(`/cartitem/${itemId}`)
        .then(() => {
          this.cartItems.splice(index, 1);
          this.$notify({
            type: 'success',
            text: 'Successfully removed item from cart.',
          });
          if (!this.cartItems.length) {
            this.$store.dispatch('timer/clearTimer');
            this.$router.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
          this.$notify({
            type: 'error',
            title: 'An error has occured',
            text: 'Failed to remove item from cart. Please try again later.',
          });
        });
    },
    clearCart() {
      this.cartItems = [];
      // send request to odoo to clear items in purchase order

      this.$store.dispatch('timer/clearTimer');
      this.$router.push('/');
    },
    navigateToBilling() {
      if (!this.cartItems.length) {
        // cart is empty
        return;
      }
      this.$router.push('/billing');
    },
  },
  computed: {
    totalPrice() {
      return this.$store.state.cart.cartTotal;
    },
  },
  watch: {
    cartItems() {
      this.$store.dispatch('cart/calculateCartPrices', this.cartItems);
    },
  },
  components: {
    ViewHeader,
    ShoppingCartItem,
  },
  mounted() {
    this.fetchCartItems();
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
    @include montserrat($h4, 400);
    p {
      margin: 20px 0 35px;
    }
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    button {
      @include montserrat($h5, 500);
      padding: 10px 25px;
      cursor: pointer;
      transition: 0.2s linear;
    }

    #clear-cart-btn {
      background-color: white;
      padding: 10px 25px;
      color: black;
      border: 1px solid #C7C7C7;;

      &:hover {
        background-color: #d2d2d2;
      }
      span {
        vertical-align: middle;
        padding-left: 4px;
      }
    }
    #continue-btn {
      background-color: $primary;
      color: white;
      margin-left: 40px;
      padding: 10px 25px;
      &:hover {
        background-color: #c85050;
      }
    }
  }

  .promo {
    margin-top: 60px;
    p {
      padding: 0;
      margin: 0;
    }

    .header {
      @include montserrat(24px, 500);
    }
    .subheader {
      @include montserrat(14px, 400);
      position: relative;
      margin: 5px 0 15px;
    }
    .subheader:after {
      content: "";
      border: 0.5px solid #d1d1d1;
      width: 390px;
      position: absolute;
      bottom: -6px;
      left: 0;
    }

    form {
      padding-top: 20px;
      display: inline-block;

      input[type="text"] {
        border: 1px solid #C7C7C7;
        vertical-align: middle;
        padding: 10px 25px;
        @include montserrat($h5, 500);
        width: 290px;
      }

      input[type="submit"] {
        @include montserrat($h5, 500);
        padding: 10px 25px;
        border: 1px solid #C7C7C7;
        background-color: whitesmoke;
        vertical-align: middle;
        cursor: pointer;
        transition: 0.2s linear;

        &:hover {
          background-color: #d2d2d2;
        }
      }
    }
  }
}
@media (max-width: 1200px) {
  .cart-wrapper {
    width: 95%;
  }
}
@media (max-width: 720px) {
  .cart-wrapper .promo {
    .header {
      font-size: 20px;
    }
    .subheader {
      font-size: 12px;
    }
    .subheader:after {
      content: "";
      width: 330px;
    }
    form input[type="text"] {
      width: 200px;
    }
  }
}
@media (max-width: 450px) {
  .cart-wrapper {
    .actions {
      display: block;

      #clear-cart-btn {
        display: block;
        margin: 0 0 15px auto;
      }
      #continue-btn {
        float: right;
      }
    }
    .promo form input[type="text"][data-v-0a4f6c3c] {
      width: 160px;
    }
  }
}
</style>
