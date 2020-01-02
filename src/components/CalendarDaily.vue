<template>
  <div>
    <table class="calendar">
      <thead>
        <td></td>
        <td v-for="pitch in pitches" :key="pitch.id">{{ pitch.name }}</td>
      </thead>
      <tr v-for="(timing, index) in timings" :key="index">
        <td class="timing">{{ timing.time }}</td>
        <td v-for="pitch in pitches" :key="pitch.id">
          <input
            v-model="selectedTimings"
            :value="{ date, time: timing.time, pitch: pitch.id, hours: timing.hours }"
            :class="`span-${timing.hours}`"
            type="checkbox"
            class="calendar-checkbox"
            :disabled="isBooked(timing, pitch.id)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
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
];

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
        const bookedTime = time.time >= slot.booking_start && time.time < slot.booking_end;
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
      this.$axios.post(`${process.env.VUE_APP_API}/calendar/day`, payload).then((res) => {
        console.dir(res.data);
        const bookedSlots = res.data.map(e => ({
          booking_start: e.booking_start.split(' ')[1].slice(0, 5),
          booking_end: e.booking_end.split(' ')[1].slice(0, 5),
          pitch_id: e.pitch_id,
        }));
        this.bookedSlots = bookedSlots;
      });
    },
  },
  watch: {
    date() {
      this.fetchbookedTimings(this.date);
    },
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
  mounted() {
    this.fieldId = this.$route.params.id;
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  width: 80%;
  margin: auto;

  thead td {
    text-align: center;
  }

  td {
    padding: 1px 4px;

    thead & {
      text-align: center;
    }

    &.timing {
      font-size: 14px;
      vertical-align: top;
      width: 40px;
      // text-align: right;
    }
  }
}

.calendar-checkbox {
  -webkit-appearance: none;
  background-color: #9f0608;
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

  .calendar & {
    width: 100%;
  }
}
</style>
