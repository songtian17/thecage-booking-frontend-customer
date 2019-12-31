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
  {
    time: '07:00',
    hours: 1,
  },
  {
    time: '08:00',
    hours: 1,
  },
  {
    time: '09:00',
    hours: 1,
  },
  {
    time: '10:00',
    hours: 1,
  },
  {
    time: '11:00',
    hours: 1,
  },
  {
    time: '12:00',
    hours: 1,
  },
  {
    time: '13:00',
    hours: 1,
  },
  {
    time: '14:00',
    hours: 1,
  },
  {
    time: '15:00',
    hours: 1,
  },
  {
    time: '16:00',
    hours: 1,
  },
  {
    time: '17:00',
    hours: 1,
  },
  {
    time: '18:00',
    hours: 2,
  },
  {
    time: '20:00',
    hours: 2,
  },
  {
    time: '22:00',
    hours: 2,
  },
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

const bookedSlots = () => [
  {
    // booking_start: '2019-10-10 13:00:00',
    // booking_end: '2019-10-10 15:00:00',
    booking_start: '13:00',
    booking_end: '15:00',
    // venue_id: [1, 'Kallang 05'],
    // pitch_id: [3, 'P3'],
    pitch_id: 3,
    // id: 71915,
  },
  {
    // booking_start: '2019-10-10 11:00:00',
    // booking_end: '2019-10-10 13:00:00',
    booking_start: '11:00',
    booking_end: '13:00',
    // venue_id: [1, 'Kallang 05'],
    // pitch_id: [4, 'P4'],
    pitch_id: 4,
    // id: 72019,
  },
];

export default {
  name: 'CalendarDaily',
  data() {
    return {
      selectedTimings: [],
    };
  },
  methods: {
    isBooked(time, pitchId) {
      return this.bookedSlots.find((slot) => {
        const bookedPitch = slot.pitch_id === pitchId;
        const bookedTime = time.time >= slot.booking_start && time.time <= slot.booking_end;
        return bookedPitch && bookedTime;
      });
    },
  },
  props: {
    bookedSlots: {
      type: Array,
      default: bookedSlots,
    },
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
