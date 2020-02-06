<template>
  <div class="weekly-calendar">
    <div class="timings-wrapper">
      <table class="timings">
        <tr v-for="(timing, index) in timings" :key="index">
          <td :class="`span-${timing.hours}`" class="timing">{{ timing.time }}</td>
          <td>
            <input
              type="checkbox"
              class="calendar-checkbox invis"
              :class="`span-${timing.hours}`"
            />
          </td>
        </tr>
      </table>
    </div>
    <calendar-weekly-day
      v-for="i in 7"
      :key="i"
      :date="weekDates[i - 1]"
      :bookedSlots="bookedSlots[i - 1]"
    ></calendar-weekly-day>
  </div>
</template>

<script>
import CalendarWeeklyDay from '@/components/CalendarWeeklyDay.vue';

export default {
  name: 'CalendarWeekly',
  components: {
    CalendarWeeklyDay,
  },
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
  },
  methods: {
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
.weekly-calendar {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.timings-wrapper {
  display: inline-block;
  padding: 6px;
}

.timings {
  display: inline-block;
  margin: auto;

  .timing {
    @include montserrat($h5, 400);
  }

  td {
    padding: 1px 1px;
    vertical-align: top;
  }
}

.calendar-checkbox {
  -webkit-appearance: none;
  background-color: #9f0608;
  padding: 9px 0;
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
}

.invis {
  visibility: hidden;
}
</style>
