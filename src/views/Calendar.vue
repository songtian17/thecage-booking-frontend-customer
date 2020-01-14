<template>
  <div>
    <view-header :main="false">
      KALLANG 05
      <calendar-date-picker @change="changeSelectedDate"></calendar-date-picker>
    </view-header>
    <div class="content-wrapper">
      <div class="legend">
        <input type="checkbox" class="calendar-checkbox" @click.prevent />
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
        <button id="add-btn" @click="openAddToCartModal">Add to cart</button>
      </div>
    </div>
    <add-to-cart-modal
      v-if="showAddToCartModal"
      :showModal.sync="showAddToCartModal"
      :selectedSlots="selectedSlots"
      @closeModal="showAddToCartModal = false"
    ></add-to-cart-modal>
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
      selectedSlots: [],
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
    openAddToCartModal() {
      this.showAddToCartModal = true;
      this.$store.commit('cart/copySelectedTimeslots');
      this.selectedSlots = this.$store.getters['cart/selectedWithProduct'];
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
    if (!this.$store.getters['cart/products'].length) {
      this.$store.dispatch('cart/fetchProducts');
    }
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  margin: 40px auto;
}

.legend {
  width: 95%;
  margin: 0 auto;
  margin-bottom: 40px;
  text-align: center;
  position: relative;

  label {
    margin: 0 16px 0 8px;
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

.calendar-type-toggle {
  float: right;
  position: absolute;
  right: 180px;
  top: 0;

  label {
    margin: 0;
  }

  span {
    @include montserrat($h4, 500);
    padding: 10px 25px;
    border: 1px solid #c7c7c7;
    background-color: white;
    color: black;
    cursor: pointer;
    transition: 0.2s linear;
    user-select: none;
    &:hover {
      background-color: #d2d2d2;
    }
  }

  input[type="radio"] {
    display: none;

    &:checked + span {
      background-color: #c85050;
      color: white;
      cursor: auto;
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
    padding: 10px 25px;
    background-color: $primary;
    color: white;
    cursor: pointer;
    transition: 0.2s linear;
    &:hover {
      background-color: #c85050;
    }
  }
}

@media (max-width: 720px) {
  .legend {
    label {
      font-size: 12px;
    }
  }
}
</style>
