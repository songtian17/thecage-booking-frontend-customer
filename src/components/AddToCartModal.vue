<template>
  <v-dialog
    max-width="600px"
    :value="showModal"
    @click:outside="onCloseModal()"
    @keydown="onCloseModal($event)"
  >
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Choose packages and add to cart</v-toolbar-title>
      </v-toolbar>
      <div class="items-wrapper">
        <div
          v-for="(slot, index) in selectedSlots"
          :key="`${slot.pitchName}, ${slot.booking_start}`"
          class="item"
        >
          <div class="item-section">
            <div id="pitch-name">{{ slot.pitchName }}</div>
            <div class="booking-time">{{ slot.booking_start }}</div>
            <div id="time-separator">-</div>
            <div class="booking-time">{{ slot.booking_end }}</div>
          </div>
          <div class="item-section">
            <div id="select-products">
              <select>
                <option
                  v-for="product in slot.availableProducts"
                  :key="product.id"
                  :value="product.id"
                >
                  {{ product.name }}
                </option>
              </select>
            </div>
            <div id="amount">${{ slot.amount }}</div>
            <v-icon id="trashcan" @click="removeCartItem(index)">mdi-trash-can</v-icon>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
const mockSelectedSlots = () => [
  {
    pitchName: 'P4',
    booking_start: '11/01/2020 12:00',
    booking_end: '11/01/2020 13:00',
    availableProducts: [
      {
        id: 1,
        name: 'Online Premium',
      },
      {
        id: 2,
        name: 'Students Special',
      },
    ],
    amount: '92.00',
  },
  {
    pitchName: 'P5',
    booking_start: '11/01/2020 12:00',
    booking_end: '11/01/2020 13:00',
    availableProducts: [
      {
        id: 1,
        name: 'Online Premium',
      },
      {
        id: 2,
        name: 'Students Special',
      },
    ],
    amount: '92.00',
  },
];

export default {
  name: 'AddToCartModal',
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    selectedSlots: {
      type: Array,
      default: mockSelectedSlots,
    },
  },
  methods: {
    onCloseModal(e) {
      if (e && e.keyCode !== 27) {
        // if event and keyPressed !== 'esc'
        return;
      }
      this.$emit('update:showModal', false);
    },
    removeCartItem(index) {
      this.selectedSlots.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.items-wrapper {
  padding: 12px 18px;
}

.item {
  padding: 12px 0;
  border-bottom: 1px solid $secondary;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;

  .item-section {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  div {
    display: inline-block;
    @include montserrat($h6, 400);
  }

  #pitch-name {
    margin-right: 16px;
  }

  .booking-time {
    background-color: #f5f4f4;
    border: 1px solid $secondary;
    padding: 0 4px;
  }

  #time-separator {
    margin: 0 8px;
    text-align: center;
  }

  #select-products {
    background-color: white;
    border: 1px solid $secondary;
    margin: 0 8px;
  }

  #amount {
    margin: 0 16px;
  }

  #trashcan {
    cursor: pointer;
  }
}
</style>
