<template>
  <div class="item=wrapper">
    <div class="first-part">
      <div class="sec-part">
        <div id="pitch-name">{{ timeslot.pitchName }}</div>
        <div class="booking-time">
          <div>{{ timeslot.booking_start }}</div>
          -
          <div>{{ timeslot.booking_end }}</div>
        </div>
      </div>

      <div class="sec-part">
        <div id="product-type">
          <available-product-options :timeslot="timeslot" @selectedChanged="onProductChange">
          </available-product-options>
        </div>
        <div id="product-price">${{ price }}</div>
      </div>
    </div>
    <div class="first-part">
      <v-icon id="trashcan" @click="$emit('remove')">mdi-trash-can</v-icon>
    </div>
  </div>
</template>

<script>
import AvailableProductOptions from '@/components/AvailableProductOptions.vue';

export default {
  name: 'AddToCartModalItem',
  components: {
    AvailableProductOptions,
  },
  data() {
    return {
      productId: '',
      price: '',
    };
  },
  props: {
    timeslot: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    onProductChange(product) {
      this.productId = product.id;
      this.price = product.price;
      this.$emit('productUpdate', this.productId);
    },
  },
};
</script>

<style lang="scss" scoped>
.item-wrapper {
  @include montserrat(14px, 400);
}

#pitch-name {
  display: inline-block;
  padding-right: 70px;
}
.booking-time {
  display: inline-block;
  padding-right: 30px;
}
#product-type {
  display: inline-block;
  padding-right: 30px;
  width: 250px;
}
#product-price {
  display: inline-block;
  padding-right: 30px;
}
.booking-time div {
  display: inline-block;
  border: 1px solid #c7c7c7;
  background: #f5f4f4;
  padding: 5px 15px;
}
.sec-part {
  display: inline-block;
}
.first-part {
  vertical-align: middle;
  display: inline-block;
}

@media (max-width: 950px) {
  .sec-part {
    display: block;
    width: 100%;
  }
  .first-part {
    vertical-align: top;
  }
  .sec-part:first-child {
    padding-bottom: 20px;
  }
}

@media (max-width: 650px) {
  .addtocartmodal {
    @include montserrat(12px, 400);
  }
  #pitch-name {
    padding-right: 20px;
  }
  .booking-time {
    padding-right: 5px;
    display: block;
  }
  #product-type {
    padding-right: 5px;
    width: 200px;
  }
  #product-price {
    padding-right: 5px;
  }
}
</style>
