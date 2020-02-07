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
import dayjs from '@/plugins/dayjs';

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
      return this.$store.getters['cart/products'].filter(
        product => this.isProductTimingValid(product) && this.isProductWeekdayValid(product),
      );
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
      let timeslotStartTime = this.getHourFromDate(this.timeslot.booking_start);
      const productStartTime = this.getHourFromTime(product.start_time);
      let productEndTime = this.getHourFromTime(product.end_time);
      if (productStartTime >= productEndTime) {
        productEndTime += 24;
        if (timeslotStartTime < productStartTime) {
          timeslotStartTime += 24;
        }
      }
      const isStartTimeValid = timeslotStartTime >= productStartTime;
      const isEndTimeValid = timeslotStartTime <= productEndTime;
      return isStartTimeValid && isEndTimeValid;
    },
    isProductWeekdayValid(product) {
      const validWeekdays = product.product_valid_day.map(d => d.day_of_week);
      const timeslotDate = dayjs.utc(this.timeslot.booking_start.split(' ')[0]).add(8, 'hour');
      const timeslotDayString = timeslotDate.format('dddd');
      return validWeekdays.some(day => day === timeslotDayString);
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
