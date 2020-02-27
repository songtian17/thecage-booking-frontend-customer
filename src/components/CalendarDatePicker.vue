<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="30"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <div class="calendar-textfield">
        <v-icon color="white" size="18px">mdi-calendar</v-icon>
        <span id="date-selector">
          <button @click="selectPrevDay">
            <v-icon color="white" size="18px">mdi-chevron-left</v-icon>
          </button>
          <input
            v-model="selectedDate"
            type="text"
            class="date-input"
            size="10"
            readonly
            v-on="on"
          />
          <button @click="selectNextDay">
            <v-icon color="white" size="18px">mdi-chevron-right</v-icon>
          </button>
        </span>
      </div>
    </template>
    <v-date-picker
      v-model="date"
      class="datepicker"
      :allowed-dates="allowedDates"
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import dayjs from '@/plugins/dayjs';

export default {
  name: 'CalendarDatePicker',
  data() {
    return {
      showDatePicker: false,
      menu: false,
      date: '',
      selectedDate: '',
      today: '',
    };
  },
  watch: {
    date() {
      this.selectedDate = dayjs.utc(this.date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    },
    selectedDate() {
      this.$emit('change', this.selectedDate);
    },
  },
  methods: {
    selectNextDay() {
      const selDate = dayjs.utc(this.selectedDate, 'DD/MM/YYYY');
      const nextDate = selDate.add(1, 'day');
      if (!nextDate.subtract(60 - 3, 'day').isBefore(this.today, 'day')) {
        return;
      }
      this.date = nextDate.format('YYYY-MM-DD');
    },
    selectPrevDay() {
      const selDate = dayjs.utc(this.selectedDate, 'DD/MM/YYYY');
      const prevDate = selDate.subtract(1, 'day');
      if (prevDate.isBefore(this.today, 'day')) {
        return;
      }
      this.date = prevDate.format('YYYY-MM-DD');
    },
    allowedDates(val) {
      const selDate = dayjs.utc(val, 'YYYY-MM-DD');
      return selDate.subtract(60 - 3, 'day').isBefore(this.today, 'day') && selDate.isAfter(this.today.subtract(1, 'day'), 'day');
    },
  },
  mounted() {
    this.today = dayjs.utc().add(8, 'hour');
    this.date = dayjs.utc().add(8, 'hour').format('YYYY-MM-DD');
  },
};
</script>

<style lang="scss" scoped>
#date-selector {
  border-bottom: 1px solid white;
  margin-left: 10px;
}

.date-input {
  @include montserrat($h5, 400);
  text-align: center;
  margin: 0 5px;
}

@media (max-width: 720px) {
  .calendar-textfield {
    margin-top: 10px;
  }
}
</style>
