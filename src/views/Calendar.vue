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
      <div class="calendar-type-toggle">
        <label>
          <input v-model="calendarType" type="radio" name="calendar-type" value="week" />
          <span>Week</span>
        </label>
        <label>
          <input v-model="calendarType" type="radio" name="calendar-type" value="day" />
          <span>Day</span>
        </label>
    </div>
  </div>
    <calendar-daily v-show="calendarType === 'day'" :date="selectedDate"></calendar-daily>
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
      calendarType: 'day',
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
  width: 80%;
  margin: 20px auto;
  text-align: center;

  .calendar-type-toggle {
    float: right;

    label {
      margin: 0;
    }

    span {
      @include montserrat($h4, 500);
      padding: 6px 12px;
      border: 1px solid $secondary;
      background-color: white;
      color: black;
      cursor: pointer;
    }

    input[type="radio"] {
      display: none;

      &:checked + span {
        background-color: $primary;
        color: white;
      }
    }
  }

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
