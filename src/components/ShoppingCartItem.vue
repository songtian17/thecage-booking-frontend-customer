<template>
  <div class="item">
    <v-icon v-if="!displayOnly" class="remove" @click="$emit('removeItem')">mdi-close</v-icon>
    <span id="name">{{ itemData.venueName }}, {{ itemData.fieldType }} Field</span>
    <span id="pitch">{{ itemData.pitchName }}</span>
    <span id="timing"
      >{{ itemData.startTime.replace("T", " ") }} - {{ itemData.endTime.replace("T", " ") }}</span
    >
    <label id="label-product">TYPE</label>
    <span id="product">{{ itemData.productName }}</span>
    <label id="label-amount">AMOUNT</label>
    <span v-if="!itemData.discountAmount || itemData.amount === itemData.discountAmount" id="amount"
      >${{ itemData.amount }}</span
    >
    <span v-else id="amount">
      <span class="strikethrough"> $ {{ itemData.amount }} </span>
      <span>$ {{ itemData.discountAmount }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCartItem',
  props: {
    itemData: {
      type: Object,
      default: () => ({
        venueName: '',
        fieldType: '',
        pitchName: '',
        startTime: '',
        endTime: '',
        productName: '',
        amount: '',
        discountAmount: '',
      }),
    },
    displayOnly: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  @include montserrat($h5, 400);
  width: 100%;
  background-color: #202020;
  padding: 25px 30px;
  margin-bottom: 18px;
  position: relative;

  .remove {
    position: absolute;
    top: 25px;
    right: 25px;
    z-index: 1;
    color: white;

    &:hover {
      cursor: pointer;
    }
  }

  span {
    color: white;
  }

  label {
    color: #a0a0a0;
  }

  .strikethrough {
    color: $primary;
    text-decoration: line-through;
    margin-right: 1em;
  }
}

/* Grid Display */
@media (max-width: 720px) {
  .item {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto;
    grid-row-gap: 4px;
    font-size: 12px;

    #name {
      grid-column: span 2;
      grid-row: 1;
    }

    #pitch {
      grid-column: span 2;
      grid-row: 2;
    }

    #timing {
      grid-column: span 2;
      grid-row: 3;
      padding-bottom: 15px;
      border-bottom: 1px solid white;
      margin-bottom: 13px;
    }

    #label-product {
      grid-row: 4;
    }

    #product {
      grid-row: 5;
    }

    #label-amount {
      grid-row: 4;
    }

    #amount {
      grid-row: 5;
    }

    label{
      font-size: 11px;
    }
    .remove{
      font-size: 20px;
    }
  }
}

@media (min-width: 720px) {
  .item {
    display: grid;
    grid-template-columns: 4fr 3fr 2fr;
    grid-template-rows: auto;
    grid-column-gap: 16px;
    grid-row-gap: 8px;

    #name {
      grid-column: 1 / span 3;
      grid-row: 1;
    }

    #pitch {
      grid-row: 2;
      grid-column: 1;
    }

    #timing {
      grid-row: 3;
      grid-column: 1;
    }

    #label-product {
      grid-row: 2;
      grid-column: 2;
    }

    #product {
      grid-row: 3;
      grid-column: 2;
    }

    #label-amount {
      grid-row: 2;
      grid-column: 3;
    }

    #amount {
      grid-row: 3;
      grid-column: 3;
    }
  }
}
/* Grid Display */
</style>
