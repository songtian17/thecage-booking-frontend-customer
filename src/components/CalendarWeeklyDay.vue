<template>
  <div class="calendar-wrapper">
    <p>{{ displayDate }}</p>
    <table class="calendar" :style="{ visibility: isPast ? 'hidden' : 'visible' }">
      <thead>
        <td v-for="pitch in pitches" :key="pitch.id">{{ pitch.name }}</td>
      </thead>
      <tr v-for="(timing, index) in timings" :key="index">
        <td v-for="pitch in pitches" :key="pitch.id">
          <input
            v-model="selectedTimeslots"
            :value="formatTimeslotObject(date, timing.time, timing.hours, pitch.id, pitch.name)"
            type="checkbox"
            class="calendar-checkbox"
            :class="`span-${timing.hours}`"
            :disabled="isBooked(timing, pitch.id)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const bookedSlots = () => [
  {
    booking_start: '13:00',
    booking_end: '15:00',
    pitch_id: 3,
  },
  {
    booking_start: '11:00',
    booking_end: '13:00',
    pitch_id: 4,
  },
];
export default {
  name: 'CalendarWeeklyDay',
  data() {
    return {
      selectedTimings: [],
    };
  },
  methods: {
    isBooked(time, pitchId) {
      return this.bookedSlots.find((slot) => {
        const bookedPitch = slot.pitch_id === pitchId;
        const bookedTime = time >= slot.booking_start && time <= slot.booking_end;
        return bookedPitch && bookedTime;
      });
    },
    toDateDisplayString(selectedDate) {
      const [d, m, y] = selectedDate.split('/');
      const dateObject = new Date(y, m - 1, d);
      const day = weekdays[dateObject.getDay()];
      const date = String(dateObject.getDate()).padStart(2, '0');
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      return `${day}, ${date}/${month}`;
    },
    formatTimeslotObject(date, startTime, hours, pitchId, pitchName) {
      const [d, m, y] = date.split('/');
      const formattedDate = `${y}-${m}-${d}`;
      let formattedEndDate = `${y}-${m}-${d}`;
      let endTimeHour = String(parseInt(startTime.split(':')[0], 10) + hours);
      if (endTimeHour === '24') {
        endTimeHour = '0';
        const nextDate = new Date(y, m - 1, d);
        nextDate.setDate(nextDate.getDate() + 1);
        formattedEndDate = this.formatDateObject(nextDate);
      }
      return {
        booking_start: `${formattedDate} ${startTime}:00`,
        booking_end: `${formattedEndDate} ${
          endTimeHour < 10 ? `0${endTimeHour}` : endTimeHour
        }:00:00`,
        pitchId,
        pitchName,
      };
    },
    formatDateObject(dateObject) {
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      const day = String(dateObject.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },
  computed: {
    isPast() {
      const [d, m, y] = this.date.split('/');
      const calendarDate = new Date(y, m - 1, d);
      const currDate = new Date();
      return (
        calendarDate < new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate())
      );
    },
    selectedTimeslots: {
      get() {
        return this.$store.state.cart.selectedTimeslots;
      },
      set(selectedTimeslots) {
        this.$store.commit('cart/setSelectedTimeslots', selectedTimeslots);
      },
    },
    displayDate() {
      return this.toDateDisplayString(this.date);
    },
  },
  props: {
    bookedSlots: {
      type: Array,
      default: bookedSlots,
    },
    timings: {
      type: Array,
      default: () => [],
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
};
</script>

<style lang="scss" scoped>
.calendar-wrapper {
  text-align: center;
  display: inline-block;
  padding: 6px;
  border-left: 1px solid #707070;

  p {
    @include montserrat($h4, 400);
  }
  &:last-child {
    border-right: 1px solid #707070;
  }
}

.calendar {
  display: inline-block;
  margin: auto;

  thead td {
    text-align: center;
    @include montserrat($h5, 400);
  }

  td {
    padding: 1px 1px;

    thead & {
      text-align: center;
    }
  }
}

.calendar-checkbox {
  -webkit-appearance: none;
  background-color: #9f0608;
  padding: 9px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  margin: 0;

  &.span-2 {
    padding-top: 18px;
    padding-bottom: 18px;
  }

  &.span-3 {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  &:active {
    background-color: #e9bfbf;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
  }

  &:checked {
    background-color: #e9bfbf;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
      inset 15px 10px -12px rgba(255, 255, 255, 0.1);

    &:active {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
    }
  }

  &:disabled {
    background-color: #808080;
  }
}
</style>
