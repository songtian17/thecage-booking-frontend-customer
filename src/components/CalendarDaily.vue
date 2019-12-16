<template>
  <div>
    <table class="calendar">
      <thead>
        <td></td>
        <td v-for="pitch in pitches" :key="pitch.id">{{ pitch.name }}</td>
      </thead>
      <tr v-for="(timing, index) in timings" :key="index">
        <td class="timing">{{ timing }}</td>
        <td v-for="pitch in pitches" :key="pitch.id">
          <input
            v-model="selectedTimings"
            :value="{ time: timing, pitch: pitch.id }"
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
        const bookedTime = time >= slot.booking_start && time <= slot.booking_end;
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
