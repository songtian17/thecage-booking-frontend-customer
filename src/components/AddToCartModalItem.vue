<template>
  <div>
    <div id="pitch-name">{{ timeslot.pitchName }}</div>
    <div class="booking-time">{{ timeslot.booking_start }}</div>
    <div id="time-separator">-</div>
    <div class="booking-time">{{ timeslot.booking_end }}</div>
    <div>
      <available-product-options :timeslot="timeslot" @selectedChanged="onProductChange">
      </available-product-options>
    </div>
    <div id="product-price">${{ price }}</div>
    <v-icon id="trashcan" @click="$emit('remove')">mdi-trash-can</v-icon>
  </div>
</template>

<script>
import AvailableProductOptions from '@/components/AvailableProductOptions.vue';

export default {
  name: 'AddToCartModalItem',
  components: {
    AvailableProductOptions,
  },
  data() {
    return {
      productId: '',
      price: '',
    };
  },
  props: {
    timeslot: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    onProductChange(product) {
      this.productId = product.id;
      this.price = product.price;
      this.$emit('productUpdate', this.productId);
    },
  },
};
</script>

<style></style>
