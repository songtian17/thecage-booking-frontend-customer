<template>
  <select v-model="selected" @change="$emit('selectedChanged', selected)">
    <option v-for="product in products" :key="product.id" :value="product">
      {{ product.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'AvailableProductOptions',
  data() {
    return {
      selected: '',
    };
  },
  props: {
    timeslot: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    products() {
      return this.$store.getters['cart/products'].filter(product => this.isProductTimingValid(product));
    },
  },
  methods: {
    getHourFromDate(dateStr) {
      const hour = dateStr.slice(11, 13);
      return parseInt(hour, 10);
    },
    isProductTimingValid(product) {
      const timeslotStartTime = this.getHourFromDate(this.timeslot.booking_start);
      const isStartTimeValid = timeslotStartTime >= this.getHourFromDate(product.start_time);
      const isEndTimeValid = timeslotStartTime <= this.getHourFromDate(product.end_time);
      return isStartTimeValid && isEndTimeValid;
    },
  },
  mounted() {
    // eslint-disable-next-line prefer-destructuring
    this.selected = this.products[0];
    this.$emit('selectedChanged', this.selected);
  },
};
</script>

<style lang="scss" scoped></style>
