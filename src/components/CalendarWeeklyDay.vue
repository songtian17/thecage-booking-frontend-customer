<template>
  <div class="calendar-wrapper">
    <p>{{ date }}</p>
    <table class="calendar">
      <thead>
        <td v-for="pitch in pitches" :key="pitch.id">{{ pitch.name }}</td>
      </thead>
      <tr v-for="(timing, index) in timings" :key="index">
        <td v-for="pitch in pitches" :key="pitch.id">
          <input
            v-model="selectedTimings"
            :value="{ date, time: timing.time, pitch: pitch.id, hours: timing.hours }"
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
  border-left: 1px solid grey;
  border-right: 1px solid grey;

  p {
    @include montserrat($h4, 500);
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
