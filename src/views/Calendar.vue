<template>
  <div>
    <view-header :main="false">
      KALLANG 05
      <br />
      <calendar-date-picker @change="changeSelectedDate"></calendar-date-picker>
    </view-header>
    <div class="legend">
      <input id="checkbox-1-1" type="checkbox" class="calendar-checkbox" @click.prevent />
      <label>Available</label>
      <input type="checkbox" class="calendar-checkbox" checked @click.prevent />
      <label>Your slot</label>
      <input type="checkbox" class="calendar-checkbox" disabled />
      <label>Booked</label>
    </div>
    <calendar-daily :date="selectedDate"></calendar-daily>
  </div>
</template>

<script>
import ViewHeader from '@/components/ViewHeader.vue';
import CalendarDatePicker from '@/components/CalendarDatePicker.vue';
import CalendarDaily from '@/components/CalendarDaily.vue';

export default {
  name: 'Calendar',
  data() {
    return {
      selectedDate: '',
    };
  },
  components: {
    ViewHeader,
    CalendarDatePicker,
    CalendarDaily,
  },
  methods: {
    changeSelectedDate(newDate) {
      this.selectedDate = newDate;
    },
  },
};
</script>

<style lang="scss" scoped>
.legend {
  text-align: center;
  margin: 20px auto;

  label {
    margin: 0 20px 0 12px;
    @include montserrat($h4, 400);
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    background-color: #9f0608;
    padding: 12px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    margin: 0;
    pointer-events: none;

    &:checked {
      background-color: #e9bfbf;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
        inset 15px 10px -12px rgba(255, 255, 255, 0.1);
    }

    &:disabled {
      background-color: #808080;
    }
  }
}
</style>
