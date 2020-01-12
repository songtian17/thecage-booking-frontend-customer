<template>
  <v-select
    v-model="selected"
    :items="products"
    item-text="name"
    :return-object="true"
    @change="$emit('selectedChanged', selected)"
  >
  </v-select>
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
    getHourFromTime(timeStr) {
      const hour = timeStr.slice(0, 2);
      return parseInt(hour, 10);
    },
    isProductTimingValid(product) {
      const timeslotStartTime = this.getHourFromDate(this.timeslot.booking_start);
      const isStartTimeValid = timeslotStartTime >= this.getHourFromTime(product.start_time);
      const isEndTimeValid = timeslotStartTime <= this.getHourFromTime(product.end_time);
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
