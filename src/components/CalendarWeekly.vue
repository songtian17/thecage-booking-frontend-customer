<template>
  <div class="weekly-calendar">
    <div class="timings-wrapper">
      <table class="timings">
        <tr v-for="(timing, index) in timings" :key="index">
          <td>{{ timing }}</td>
        </tr>
      </table>
    </div>
    <calendar-weekly-day
      v-for="i in 7"
      :key="i"
      :timings="timings"
      :pitches="pitches"
      :date="datesDisplayed[i - 1]"
    ></calendar-weekly-day>
  </div>
</template>

<script>
import CalendarWeeklyDay from '@/components/CalendarWeeklyDay.vue';

const timings = () => [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

const pitches = () => [
  {
    id: 1,
    name: 'P1',
  },
  {
    id: 2,
    name: 'P2',
  },
  {
    id: 3,
    name: 'P3',
  },
  {
    id: 4,
    name: 'P4',
  },
  {
    id: 5,
    name: 'P5',
  },
  {
    id: 6,
    name: 'P6',
  },
  {
    id: 7,
    name: 'P7',
  },
  {
    id: 8,
    name: 'P8',
  },
];

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
      default: pitches,
    },
    date: {
      type: String,
      default: '',
    },
  },
  computed: {
    datesDisplayed() {
      const dates = [];

      if (this.date === '') {
        return [];
      }

      for (let i = -3; i <= 3; i += 1) {
        const dateObject = this.toDateObject(this.date);
        const shiftedDateObject = this.shiftDateByDays(dateObject, i);
        const formattedDate = this.toDateDisplayString(shiftedDateObject);
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
    toDateDisplayString(dateObject) {
      const day = weekdays[dateObject.getDay()];
      const date = String(dateObject.getDate()).padStart(2, '0');
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      return `${day}, ${date}/${month}`;
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
}

.timings-wrapper {
  display: inline-block;
  padding: 10px;
}

.timings {
  display: inline-block;
  font-size: 14px;
  width: 40px;

  tr {
    height: 26px;
  }
}
</style>
