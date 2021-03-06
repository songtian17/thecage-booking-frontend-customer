<template>
  <div>
    <table class="calendar">
      <thead>
        <td></td>
        <td v-for="pitch in pitches" :key="pitch.id">{{ pitch.name }}</td>
      </thead>
      <tr v-for="(timing, index) in filterPast(timings)" :key="index">
        <td v-if="timing.hours <= 3" class="timing">{{ timing.time }}</td>
        <td v-for="pitch in pitches" :key="pitch.id">
          <input
            v-if="timing.hours <= 3"
            v-model="selectedTimeslots"
            :value="formatTimeslotObject(date, timing.time, timing.hours, pitch.id, pitch.name)"
            :class="`span-${timing.hours}`"
            :style="themeStyle"
            type="checkbox"
            class="calendar-checkbox"
            :disabled="isBooked(timing, pitch.odoo_id)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import dayjs from '@/plugins/dayjs';

export default {
  name: 'CalendarDaily',
  data() {
    return {
      bookedSlots: [],
      selectedTimings: [],
      fieldId: '',
    };
  },
  methods: {
    isBooked(time, pitchId) {
      return this.bookedSlots.find((slot) => {
        const bookedPitch = slot.pitch_id === pitchId;
        const bookedTime = time.time >= slot.booking_start
          && (time.time < slot.booking_end || slot.booking_end === '00:00');
        return bookedPitch && bookedTime;
      });
    },
    fetchbookedTimings(date) {
      // bookingDate: 'YYYY-MM-DD',
      // fieldId: '9', // field id in database
      const [d, m, y] = date.split('/');
      const bookingDate = `${y}-${m}-${d}`;
      const payload = {
        bookingDate,
        fieldId: this.fieldId,
      };
      this.$axios.post('/calendar/day', payload).then((res) => {
        const bookedSlots = res.data.map(e => ({
          booking_start: e.booking_start.split(' ')[1].slice(0, 5),
          booking_end: e.booking_end.split(' ')[1].slice(0, 5),
          pitch_id: e.pitch_id,
        }));
        this.bookedSlots = bookedSlots;
      });
    },
    formatTimeslotObject(date, startTime, hours, pitchId, pitchName) {
      const selDate = dayjs.utc(date, 'DD/MM/YYYY');
      const startDate = selDate;
      let endDate = selDate;

      let endTimeHour = String(parseInt(startTime.split(':')[0], 10) + hours);
      if (endTimeHour === '24') {
        endTimeHour = '0';
        endDate = selDate.add(1, 'day');
      }
      return {
        booking_start: `${startDate.format('YYYY-MM-DD')} ${startTime}:00`,
        booking_end: `${endDate.format('YYYY-MM-DD')} ${
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
    filterPast(timings) {
      if (!timings) {
        return timings;
      }
      const today = dayjs.utc(new Date()).add(8, 'hour');
      const todayHour = today.utc().hour();
      const selectedDay = dayjs.utc(this.date, 'DD/MM/YYYY');
      const isDatePast = selectedDay.isBefore(today, 'day');
      if (isDatePast) {
        return [];
      }
      if (selectedDay.isSame(today, 'day')) {
        const newTimings = timings.filter(t => parseInt(t.time.slice(0, 2), 10) > todayHour);
        return newTimings;
      }

      return timings;
    },
  },
  computed: {
    selectedTimeslots: {
      get() {
        return this.$store.state.cart.selectedTimeslots;
      },
      set(selectedTimeslots) {
        this.$store.commit('cart/setSelectedTimeslots', selectedTimeslots);
      },
    },
    timings() {
      return this.$store.state.activeField.timings;
    },
    pitches() {
      return this.$store.state.activeField.pitches;
    },
    themeStyle() {
      return {
        '--color': this.$store.state.activeField.themeColor,
        '--active-color': this.$store.state.activeField.themeActiveColor,
      };
    },
  },
  watch: {
    date() {
      this.fetchbookedTimings(this.date);
    },
  },
  props: {
    date: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.fieldId = this.$route.params.id;
  },
  destroyed() {
    this.$store.commit('cart/clearSelectedTimeslots');
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  width: 80%;
  margin: auto;

  thead td {
    text-align: center;
    @include montserrat($h5, 400);
  }

  td {
    padding: 1px 4px;

    thead & {
      text-align: center;
    }

    &.timing {
      @include montserrat($h5, 400);
      vertical-align: top;
      width: 40px;
      // text-align: right;
    }
  }
}

.calendar-checkbox {
  -webkit-appearance: none;
  background-color: var(--color);
  padding: 12px;
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
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
  }

  &:checked {
    background-color: var(--active-color);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
      inset 15px 10px -12px rgba(255, 255, 255, 0.1);

    &:active {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
    }
  }

  &:disabled {
    background-color: #808080;
  }

  .calendar & {
    width: 100%;
  }
}

@media (max-width: 720px) {
  .calendar {
    width: 95%;
  }
  .calendar td.timing {
    font-size: 12px;
  }
}
</style>
