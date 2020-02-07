<template>
  <div class="grid-container">
    <table class="timings">
      <thead class="invis">
        <td>P0</td>
      </thead>
      <tr v-for="(timing, index) in timings" :key="index">
        <td :class="`span-${timing.hours}`" class="timing">{{ timing.time }}</td>
        <td>
          <input
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
            :style="themeStyle"
            :class="`span-${timing.hours}`"
            :disabled="isBooked(timing, pitch.odoo_id)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

      for (let i = -3; i <= 3; i += 1) {
        const dateObject = this.toDateObject(this.date);
        const shiftedDateObject = this.shiftDateByDays(dateObject, i);
        const formattedDate = this.formatDateObject(shiftedDateObject, 'DD/MM/YY');
        dates.push(formattedDate);
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
    toDateDisplayString(selectedDate) {
      if (!selectedDate) {
        return '';
      }
      const [d, m, y] = selectedDate.split('/');
      const dateObject = new Date(y, m - 1, d);
      const day = weekdays[dateObject.getDay()];
      const date = String(dateObject.getDate()).padStart(2, '0');
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      return `${day}, ${date}/${month}`;
    },
    isBooked(time, pitchId) {
      return this.bookedSlots.find((slot) => {
        const bookedPitch = slot.pitch_id === pitchId;
        const bookedTime = time.time >= slot.booking_start
          && (time.time < slot.booking_end || slot.booking_end === '00:00');
        return bookedPitch && bookedTime;
      });
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
    toDateObject(displayDate) {
      const [day, month, year] = displayDate.split('/');
      return new Date(year, month - 1, day);
    },
    formatDateObject(dateObject, format) {
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, '0');
      const day = String(dateObject.getDate()).padStart(2, '0');
      switch (format) {
        case 'DD/MM/YY':
          return `${day}/${month}/${year}`;
        case 'YY-MM-DD':
          return `${year}-${month}-${day}`;
        default:
          return 'Invalid date format';
      }
    },
    shiftDateByDays(dateObject, numDays) {
      const newDateObject = new Date(dateObject.getTime());
      newDateObject.setDate(newDateObject.getDate() + numDays);
      return newDateObject;
    },
    fetchBookedTimings(date) {
      if (!date) {
        return;
      }
      const selDate = this.toDateObject(date);
      const currDateTime = new Date();
      const currDate = new Date(
        currDateTime.getFullYear(),
        currDateTime.getMonth(),
        currDateTime.getDate(),
      );
      let startDate;
      const shiftDays = [-3, -2, -1, 0, 1, 2, 3];

      const endDate = this.shiftDateByDays(selDate, 3);
      if (endDate < currDate) {
        return;
      }

      for (let i = 0; i < shiftDays.length - 1; i += 1) {
        const daysToShift = shiftDays[i];
        startDate = this.shiftDateByDays(selDate, daysToShift);
        if (startDate < currDate) {
          startDate = null;
        } else {
          break;
        }
      }
      if (startDate === null) {
        return;
      }
      const payload = {
        bookingDateStart: this.formatDateObject(startDate, 'YY-MM-DD'),
        bookingDateEnd: this.formatDateObject(endDate, 'YY-MM-DD'),
        fieldId: this.fieldId,
      };
      this.$axios.post('/calendar/week', payload).then((res) => {
        const bookedSlots = res.data;
        const bookedSlotsArray = [];
        const datesArray = shiftDays.map(days => this.formatDateObject(this.shiftDateByDays(selDate, days), 'YY-MM-DD'));
        for (let i = 0; i < shiftDays.length; i += 1) {
          bookedSlotsArray.push([]);
        }
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
}

.invis {
  visibility: hidden;
}
</style>
