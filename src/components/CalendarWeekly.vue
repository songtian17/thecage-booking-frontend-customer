<template>
  <div class="grid-container">
    <table class="timings">
      <thead class="invis">
        <td>P0</td>
      </thead>
      <tr v-for="(timing, index) in timings" :key="index">
        <td v-if="timing.hours <= 3" :class="`span-${timing.hours}`" class="timing">
          {{ timing.time }}
        </td>
        <td>
          <input
            v-if="timing.hours <= 3"
            type="checkbox"
            class="calendar-checkbox"
            style="padding-left: 0; padding-right: 0;"
            :class="`span-${timing.hours}`"
          />
        </td>
      </tr>
    </table>

    <div v-for="i in 7" :key="`day-${i}`" class="date-display" :class="`day${i - 1}`">
      {{ toDateDisplayString(weekDates[i - 1]) }}
    </div>
    <table v-for="i in 7" :key="`slot-${i}`" :class="`slot${i - 1}`">
      <div v-if="!isPast(weekDates[i - 1])">
        <thead>
          <td v-for="pitch in pitches" :key="pitch.id">{{ pitch.name }}</td>
        </thead>
        <tr v-for="(timing, index) in timings" :key="index">
          <td v-for="pitch in pitches" :key="pitch.id">
            <input
              v-model="selectedTimeslots"
              :value="
                formatTimeslotObject(
                  weekDates[i - 1],
                  timing.time,
                  timing.hours,
                  pitch.id,
                  pitch.name
                )
              "
              type="checkbox"
              class="calendar-checkbox"
              :style="{
                ...themeStyle,
                visibility: isTimePast(weekDates[i - 1], timing) ? 'hidden' : 'visible'
              }"
              :class="`span-${timing.hours}`"
              :disabled="isBooked(timing, pitch.odoo_id, i - 1)"
            />
          </td>
        </tr>
      </div>
    </table>
  </div>
</template>

<script>
import dayjs from '@/plugins/dayjs';

export default {
  name: 'CalendarWeekly',
  data() {
    return {
      fieldId: '',
      bookedSlots: [],
    };
  },
  props: {
    date: {
      type: String,
      default: '',
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
    weekDates() {
      const dates = [];
      if (this.date === '') {
        return [];
      }
      const selectedDate = dayjs.utc(this.date, 'DD/MM/YYYY');
      for (let i = -3; i <= 3; i += 1) {
        const newDate = selectedDate.add(i, 'day').format('DD/MM/YYYY');
        dates.push(newDate);
      }
      return dates;
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
  methods: {
    isTimePast(date, timing) {
      const selectedDate = dayjs.utc(date, 'DD/MM/YYYY');
      const today = dayjs.utc(new Date()).add(8, 'hour');
      const isSameDay = selectedDate.isSame(today, 'day');
      if (!isSameDay) {
        return false;
      }
      const isPastTime = parseInt(timing.time.slice(0, 2), 10) <= today.hour();
      return isPastTime;
    },
    isPast(date) {
      const selectedDate = dayjs.utc(date, 'DD/MM/YYYY');
      const today = dayjs.utc(new Date()).add(8, 'hour');
      return selectedDate.isBefore(today, 'day');
    },
    filterPast(timings) {
      if (!timings) {
        return [];
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
    toDateDisplayString(dateStr) {
      if (!dateStr) {
        return '';
      }
      return dayjs.utc(dateStr, 'DD/MM/YYYY').format('ddd, DD/MM');
    },
    isBooked(time, pitchId, dayOfWeek) {
      if (!this.bookedSlots.length) {
        return false;
      }
      return this.bookedSlots[dayOfWeek].some((slot) => {
        const bookedPitch = slot.pitch_id === pitchId;
        const bookedTime = time.time >= slot.booking_start
          && (time.time < slot.booking_end || slot.booking_end === '00:00');
        return bookedPitch && bookedTime;
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
    fetchBookedTimings(date) {
      if (!date) {
        return;
      }
      let startDate;
      const selDate = dayjs.utc(date, 'DD/MM/YYYY').add(8, 'hour');
      const currDate = dayjs.utc(new Date()).add(8, 'hour');
      const endDate = selDate.add(3, 'day');
      if (endDate.isBefore(selDate, 'day')) {
        return;
      }
      for (let i = -3; i <= 3; i += 1) {
        startDate = selDate.add(i, 'day');
        if (startDate.isAfter(currDate)) {
          break;
        } else {
          startDate = null;
        }
      }
      if (!startDate) {
        return;
      }
      const payload = {
        bookingDateStart: startDate.format('YYYY-MM-DD'),
        bookingDateEnd: endDate.format('YYYY-MM-DD'),
        fieldId: this.fieldId,
      };
      this.$axios.post('/calendar/week', payload).then((res) => {
        const bookedSlots = res.data;
        const shiftDays = [-3, -2, -1, 0, 1, 2, 3];
        const bookedSlotsArray = [];
        for (let i = 0; i < shiftDays.length; i += 1) {
          bookedSlotsArray.push([]);
        }
        const datesArray = shiftDays.map(days => selDate.add(days, 'day').format('YYYY-MM-DD'));
        bookedSlots.forEach((slot) => {
          const slotStartDate = slot.booking_start.split(' ')[0];
          const i = datesArray.findIndex(d => d === slotStartDate);
          if (i === -1) {
            return;
          }
          const slotData = {
            booking_start: slot.booking_start.split(' ')[1].slice(0, 5),
            booking_end: slot.booking_end.split(' ')[1].slice(0, 5),
            pitch_id: slot.pitch_id,
          };
          bookedSlotsArray[i].push(slotData);
        });
        this.bookedSlots = bookedSlotsArray;
      });
    },
  },
  watch: {
    date() {
      this.fetchBookedTimings(this.date);
    },
  },
  mounted() {
    this.fieldId = this.$route.params.id;
    this.fetchBookedTimings();
  },
};
</script>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 60px auto;
  grid-template-rows: auto;
  grid-template-areas:
    ".        day0  day1  day2  day3  day4  day5  day6"
    "timings  slot0 slot1 slot2 slot3 slot4 slot5 slot6";
  align-items: center;
  justify-items: center;
  grid-gap: 10px 10px;
  justify-content: center;
}

.timings {
  grid-area: timings;
}

$days: 0, 1, 2, 3, 4, 5, 6;

@each $i in $days {
  .day#{$i} {
    grid-area: day#{$i};
  }
  .slot#{$i} {
    grid-area: slot#{$i};
  }
}

td {
  @include montserrat($h5, 400);
  padding: 1px 1px;
  vertical-align: top;
}

.date-display {
  @include montserrat($h4, 400);
}

.calendar-checkbox {
  -webkit-appearance: none;
  background-color: var(--color);
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
    background-color: var(--active-color);
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
}

.invis {
  visibility: hidden;
}
</style>
