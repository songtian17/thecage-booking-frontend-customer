<template>
  <div>
    <view-header :main="false">
      KALLANG 05
      <br />
      <calendar-date-picker @change="changeSelectedDate"></calendar-date-picker>
    </view-header>
    <div class="content-wrapper">
      <div class="legend">
        <input id="checkbox-1-1" type="checkbox" class="calendar-checkbox" @click.prevent />
        <label>Available</label>
        <input type="checkbox" class="calendar-checkbox" checked @click.prevent />
        <label>Your slot</label>
        <input type="checkbox" class="calendar-checkbox" disabled />
        <label>Booked</label>
        <div v-if="isDesktop" class="calendar-type-toggle">
          <label>
            <input v-model="calendarType" type="radio" name="calendar-type" value="week" />
            <span>Week</span>
          </label>
          <label>
            <input v-model="calendarType" type="radio" name="calendar-type" value="day" />
            <span>Day</span>
          </label>
        </div>
      </div>
      <calendar-daily
        v-show="calendarType === 'day'"
        :date="selectedDate"
        :pitches="pitches"
      ></calendar-daily>
      <calendar-weekly
        v-if="isDesktop"
        v-show="calendarType === 'week'"
        :date="selectedDate"
        :pitches="pitches"
      ></calendar-weekly>
      <div class="btn-wrapper">
        <button id="add-btn" @click="showAddToCartModal = true">Add to cart</button>
      </div>
    </div>
  <add-to-cart-modal :showModal.sync="showAddToCartModal"></add-to-cart-modal>
  </div>
</template>

<script>
import ViewHeader from '@/components/ViewHeader.vue';
import CalendarDatePicker from '@/components/CalendarDatePicker.vue';
import CalendarDaily from '@/components/CalendarDaily.vue';
import CalendarWeekly from '@/components/CalendarWeekly.vue';
import AddToCartModal from '@/components/AddToCartModal.vue';

export default {
  name: 'Calendar',
  data() {
    return {
      selectedDate: '',
      calendarType: 'day',
      showAddToCartModal: false,
      pitches: [],
    };
  },
  components: {
    ViewHeader,
    CalendarDatePicker,
    CalendarDaily,
    CalendarWeekly,
    AddToCartModal,
  },
  computed: {
    isDesktop() {
      return this.$vuetify.breakpoint.width >= 1280;
    },
  },
  methods: {
    changeSelectedDate(newDate) {
      this.selectedDate = newDate;
    },
  },
    fetchPitches(fieldId) {
      this.$axios
        .get(`/field/${fieldId}`)
        .then((res) => {
          this.pitches = res.data.pitches;
        })
        .catch((err) => {
          this.$notify({
            type: 'error',
            title: 'Failed to fetch field information',
            message: `Error message: ${err}`,
          });
        });
    },
  },
  watch: {
    isDesktop(bool) {
      if (!bool) {
        this.calendarType = 'day';
      }
    },
  },
  mounted() {
    this.fetchPitches(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  margin: 40px auto;
}

.legend {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 60px;
  text-align: center;

  .calendar-type-toggle {
    float: right;

    label {
      margin: 0;
    }

    span {
      @include montserrat($h4, 500);
      padding: 6px 12px;
      border: 1px solid $secondary;
      background-color: white;
      color: black;
      cursor: pointer;
    }

    input[type="radio"] {
      display: none;

      &:checked + span {
        background-color: $primary;
        color: white;
      }
    }
  }

  label {
    margin: 0 20px 0 12px;
    @include montserrat($h4, 400);
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    background-color: #9f0608;
    padding: 12px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    margin: 0;
    pointer-events: none;

    &:checked {
      background-color: #e9bfbf;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
        inset 15px 10px -12px rgba(255, 255, 255, 0.1);
    }

    &:disabled {
      background-color: #808080;
    }
  }
}

.btn-wrapper {
  width: 90%;
  margin: 60px auto;
  display: flex;
  justify-content: flex-end;

  #add-btn {
    @include montserrat($h5, 500);
    padding: 6px 12px;
    background-color: $primary;
    color: white;
    border-radius: 6px;
  }
}
</style>
