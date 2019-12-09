<template>
  <div>
    <view-header :main="false">
      KALLANG 05
      <br />
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <div>
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
        <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
      </v-menu>
    </view-header>
    <calendar-daily :date="selectedDate"></calendar-daily>
  </div>
</template>

<script>
import ViewHeader from '@/components/ViewHeader.vue';
import CalendarDaily from '@/components/CalendarDaily.vue';

export default {
  name: 'Calendar',
  data() {
    return {
      showDatePicker: false,
      menu: false,
      date: '',
      selectedDate: '',
    };
  },
  components: {
    ViewHeader,
    CalendarDaily,
  },
  watch: {
    date() {
      this.selectedDate = this.formatDatePickerDate(this.date);
    },
  },
  methods: {
    formatDatePickerDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    formatDateObject(Date) {
      const year = Date.getFullYear();
      const month = String(Date.getMonth()).padStart(2, '0');
      const day = String(Date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    selectNextDay() {
      const [currentDay, currentMonth, currentYear] = this.selectedDate.split('/');
      const currentDate = new Date(currentYear, currentMonth, currentDay);
      currentDate.setDate(currentDate.getDate() + 1);
      this.date = this.formatDateObject(currentDate);
    },
    selectPrevDay() {
      const [currentDay, currentMonth, currentYear] = this.selectedDate.split('/');
      const currentDate = new Date(currentYear, currentMonth, currentDay);
      currentDate.setDate(currentDate.getDate() - 1);
      this.date = this.formatDateObject(currentDate);
    },
  },
  mounted() {
    this.date = this.formatDateObject(new Date());
  },
};
</script>

<style lang="scss" scoped>
#date-selector {
  border-bottom: 1px solid white;
  margin-left: 10px;
}

.date-input {
  @include montserrat($h6, 400);
  text-align: center;
  margin: 0 -10px;
}
</style>
