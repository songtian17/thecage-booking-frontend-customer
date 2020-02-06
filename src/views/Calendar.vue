<template>
  <div>
    <view-header :main="false">
      {{ fieldName }}
      <calendar-date-picker @change="changeSelectedDate"></calendar-date-picker>
    </view-header>
    <div v-show="pitches.length" class="content-wrapper">
      <div class="legend">
        <input
          type="checkbox"
          class="calendar-checkbox"
          :style="{ 'background-color': themeColor }"
          @click.prevent
        />
        <label>Available</label>
        <input
          type="checkbox"
          class="calendar-checkbox"
          checked
          :style="{ 'background-color': themeActiveColor }"
          @click.prevent
        />
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
      <calendar-daily v-show="calendarType === 'day'" :date="selectedDate"></calendar-daily>
      <calendar-weekly
        v-if="isDesktop"
        v-show="calendarType === 'week'"
        :date="selectedDate"
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

/* eslint no-bitwise: ["error", { "allow": ["&", "|", ">>", "<<"] }] */
export default {
  name: 'Calendar',
  data() {
    return {
      selectedDate: '',
      calendarType: 'day',
      showAddToCartModal: false,
      selectedSlots: [],
      pitches: [],
      fieldName: '',
      themeColor: '',
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
      return this.$vuetify.breakpoint.width >= 1440;
    },
    themeActiveColor() {
      return this.lightenDarkenColor(this.themeColor, 180);
    },
  },
  methods: {
    changeSelectedDate(newDate) {
      this.selectedDate = newDate;
    },
    openAddToCartModal() {
      if (!this.$store.getters['auth/isAuthenticated']) {
        this.$notify({
          type: 'error',
          title: 'Action failed',
          text: 'You must be signed in to perform that action',
        });
        this.$router.push('/signin');
        return;
      }
      this.showAddToCartModal = true;
      this.$store.commit('cart/copySelectedTimeslots');
      this.selectedSlots = this.$store.getters['cart/selectedWithProduct'];
    },
    fetchFieldData(fieldId) {
      this.$axios
        .get(`/field/${fieldId}`)
        .then((res) => {
          this.pitches = res.data.pitches;
          this.themeColor = res.data.colour;
          const themeActiveColor = this.lightenDarkenColor(this.themeColor, 100);
          this.$store.commit('activeField/setPitches', this.pitches);
          this.$store.commit('activeField/setThemeColor', this.themeColor);
          this.$store.commit('activeField/setThemeActiveColor', themeActiveColor);
          this.fieldName = res.data.name;
        })
        .catch((err) => {
          this.$notify({
            type: 'error',
            title: 'Failed to fetch field information',
            message: `Error message: ${err}`,
          });
        });
    },
    fetchCustomTimeslots() {
      this.$axios.get(`/customtimeslots/${this.$route.params.id}`).then((res) => {
        const customTimeslots = res.data;
        this.$store.dispatch('activeField/setCustomTimeslots', customTimeslots);
      });
    },
    lightenDarkenColor(hexCol, amt) {
      const col = hexCol.slice(1);
      const num = parseInt(col, 16);
      let r = (num >> 16) + amt;
      if (r > 255) r = 255;
      else if (r < 0) r = 0;
      let b = ((num >> 8) & 0x00ff) + amt;
      if (b > 255) b = 255;
      else if (b < 0) b = 0;
      let g = (num & 0x0000ff) + amt;
      if (g > 255) g = 255;
      else if (g < 0) g = 0;
      return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
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
    this.fetchCustomTimeslots();
    this.fetchFieldData(this.$route.params.id);
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
