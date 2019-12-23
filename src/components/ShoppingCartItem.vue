<template>
  <div class="item">
    <span id="name">{{ itemData.venue }}, {{ itemData.field }} Field</span>
    <span id="pitch">{{ itemData.pitch }}</span>
    <span id="timing">{{ itemData.timeStart }} - {{ itemData.timeEnd }}</span>
    <label id="label-product">TYPE</label>
    <span id="product">{{ itemData.product }}</span>
    <label id="label-amount">AMOUNT</label>
    <span id="amount">${{ itemData.amount }}</span>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCartItem',
  props: {
    itemData: {
      type: Object,
      default: () => ({
        venue: '',
        field: '',
        pitch: '',
        timeStart: '',
        timeEnd: '',
        product: '',
        amount: '',
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  @include montserrat($h5, 400);
  width: 100%;
  background-color: #202020;
  padding: 10px;
  margin-bottom: 18px;

  span {
    color: white;
  }

  label {
    color: #a0a0a0;
  }
}

/* Grid Display */
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
/* Grid Display */
</style>
