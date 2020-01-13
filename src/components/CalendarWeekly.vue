<template>
  <div class="weekly-calendar">
    <div class="timings-wrapper">
      <table class="timings">
        <tr v-for="(timing, index) in timings" :key="index">
          <td :class="`span-${timing.hours}`">{{ timing.time }}</td>
        </tr>
      </table>
    </div>
    <calendar-weekly-day
      v-for="i in 7"
      :key="i"
      :timings="timings"
      :pitches="pitches"
      :date="weekDates[i - 1]"
    ></calendar-weekly-day>
  </div>
</template>

<script>
import CalendarWeeklyDay from '@/components/CalendarWeeklyDay.vue';

const timings = () => [
  { time: '00:00', hours: 1 },
  { time: '01:00', hours: 1 },
  { time: '02:00', hours: 1 },
  { time: '03:00', hours: 1 },
  { time: '04:00', hours: 1 },
  { time: '05:00', hours: 1 },
  { time: '06:00', hours: 1 },
  { time: '07:00', hours: 1 },
  { time: '08:00', hours: 1 },
  { time: '09:00', hours: 1 },
  { time: '10:00', hours: 1 },
  { time: '11:00', hours: 1 },
  { time: '12:00', hours: 1 },
  { time: '13:00', hours: 1 },
  { time: '14:00', hours: 1 },
  { time: '15:00', hours: 1 },
  { time: '16:00', hours: 1 },
  { time: '17:00', hours: 1 },
  { time: '18:00', hours: 1 },
  { time: '19:00', hours: 1 },
  { time: '20:00', hours: 1 },
  { time: '21:00', hours: 1 },
  { time: '22:00', hours: 1 },
  { time: '23:00', hours: 1 },
];

export default {
  name: 'CalendarWeekly',
  components: {
    CalendarWeeklyDay,
  },
  data() {
    return {};
  },
  props: {
    timings: {
      type: Array,
      default: timings,
    },
    pitches: {
      type: Array,
      default: () => [],
    },
    date: {
      type: String,
      default: '',
    },
  },
  computed: {
    weekDates() {
      const dates = [];

      if (this.date === '') {
        return [];
      }

      for (let i = -3; i <= 3; i += 1) {
        const dateObject = this.toDateObject(this.date);
        const shiftedDateObject = this.shiftDateByDays(dateObject, i);
        const formattedDate = this.formatDateObject(shiftedDateObject);
        dates.push(formattedDate);
      }
      return dates;
    },
  },
  methods: {
    toDateObject(displayDate) {
      const [day, month, year] = displayDate.split('/');
      return new Date(year, month - 1, day);
    },
    formatDateObject(dateObject) {
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      const day = String(dateObject.getDate()).padStart(2, '0');
      return `${day}/${month}/${year}`;
    },
    shiftDateByDays(dateObject, numDays) {
      dateObject.setDate(dateObject.getDate() + numDays);
      return dateObject;
    },
  },
};
</script>

<style lang="scss" scoped>
.weekly-calendar {
  width: 95%;
  margin: 0 auto;
  text-align: center;
}

.timings-wrapper {
  display: inline-block;
  padding: 10px;
}

.timings {
  display: inline-block;
    @include montserrat($h5, 400);
  width: 40px;

  tr {
    height: 26px;
  }

  .span-2 {
    padding-bottom: 17px;
  }

  .span-3 {
    padding-bottom: 29px;
  }
}
</style>
