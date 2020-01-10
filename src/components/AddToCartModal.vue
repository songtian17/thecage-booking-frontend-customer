<template>
  <v-dialog
    max-width="900px"
    :value="showModal"
    @click:outside="onCloseModal()"
    @keydown="onCloseModal($event)"
  >
    <v-card>
      <v-toolbar color="#C85050" dark flat>
        <v-toolbar-title>Choose packages and add to cart</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <div class="items-wrapper">
          <add-to-cart-modal-item
            v-for="(slot, index) in selectedSlots"
            :key="`${slot.booking_start}, ${slot.pitchId}`"
            :timeslot="slot"
            class="modal-item"
            @productUpdate="slot.productId = $event"
            @remove="removeCartItem(index)"
          >
          </add-to-cart-modal-item>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="$emit('closeModal')">Continue Booking</v-btn>
        <v-btn color="primary darken-1" text @click="addItemsToCart">Add to Cart</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AddToCartModalItem from '@/components/AddToCartModalItem.vue';

export default {
  name: 'AddToCartModal',
  data() {
    return {};
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    selectedSlots: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onCloseModal(e) {
      if (e && e.keyCode !== 27) {
        // if event and keyPressed !== 'esc'
        return;
      }
      this.$emit('update:showModal', false);
    },
    removeCartItem(index) {
      this.$store.commit('cart/removeSelectedTimeslot', index);
      this.$store.commit('cart/removeSelectedWithProduct', index);
    },
    addItemsToCart() {
      console.log('Add To Cart CLICKED');
      this.$axios
        .post('/cartitem', { items: this.selectedSlots })
        .then((res) => {
          console.log(res);
          this.$emit('closeModal');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    AddToCartModalItem,
  },
};
</script>

<style lang="scss" scoped>
.modal-item {
  padding: 20px 0;
  border-bottom: 1px solid #c7c7c7;
}

.modal-item:last-child {
  border-bottom: none;
}

.item {
  padding: 12px 0;
  border-bottom: 1px solid $secondary;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;

  .item-section {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  div {
    display: inline-block;
    @include montserrat($h6, 400);
  }

  #pitch-name {
    margin-right: 16px;
  }

  .booking-time {
    background-color: #f5f4f4;
    border: 1px solid $secondary;
    padding: 0 4px;
  }

  #time-separator {
    margin: 0 8px;
    text-align: center;
  }

  #select-products {
    background-color: white;
    border: 1px solid $secondary;
    margin: 0 8px;
  }

  #trashcan {
    cursor: pointer;
  }
}
</style>
