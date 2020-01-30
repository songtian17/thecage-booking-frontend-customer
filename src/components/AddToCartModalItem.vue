<template>
  <div class="item=wrapper">
    <div class="first-part">
      <div class="sec-part">
        <div id="pitch-name">{{ timeslot.pitchName }}</div>
        <div id="pitch-name-mb"><span class="bold">Pitch:</span> {{ timeslot.pitchName }}</div>
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
        <div id="product-price">${{ totalPrice }}</div>
        <div id="product-price-mb">
          <span class="bold">Price:</span> ${{ totalPrice }}
        </div>
      </div>
    </div>
    <div class="first-part">
      <v-icon id="trashcan" @click="$emit('remove')">mdi-trash-can</v-icon>
      <v-icon id="close-icon" @click="$emit('remove')">mdi-close</v-icon>
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
  computed: {
    totalPrice() {
      let endHour = parseInt(this.timeslot.booking_end.slice(11, 13), 10);
      if (endHour === 0) {
        endHour = 24;
      }
      const startHour = parseInt(this.timeslot.booking_start.slice(11, 13), 10);
      const hours = endHour - startHour;
      console.log(hours * this.price);
      return hours * this.price;
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
#pitch-name-mb {
  display: none;
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
#product-price-mb {
  display: none;
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
#close-icon {
  display: none;
}
.bold {
  font-weight: 600;
}

@media (max-width: 950px) {
  .sec-part {
    display: block;
    width: 100%;
  }
  .first-part {
    vertical-align: top;
  }
  #product-price {
    float: right;
    line-height: 60px;
  }
  #close-icon {
    display: block;
    position: absolute;
    top: 15px;
    right: -30px;
  }
  #trashcan {
    display: none;
  }
}

@media (max-width: 650px) {
  .addtocartmodal {
    @include montserrat(12px, 400);
  }
  #pitch-name {
    display: none;
  }
  #pitch-name-mb {
    display: block;
    padding-right: 20px;
    padding-bottom: 10px;
  }
  .booking-time {
    padding-right: 5px;
    display: block;
    div {
      margin: 5px auto;
    }
  }
  #product-type {
    padding-right: 5px;
    width: 100%;
  }
  #product-price {
    display: none;
  }
  #product-price-mb {
    display: block;
  }
}
</style>
