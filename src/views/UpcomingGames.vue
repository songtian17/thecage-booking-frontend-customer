<template>
  <div>
    <view-header :main="false">
      Upcoming Games
    </view-header>
    <div class="content-wrapper">
      <div v-for="game in upcomingGames" :key="`${game.pitch}: ${game.timeStart}`" class="game">
        <div class="collapsable" @click="game.active = !game.active">
          <div>{{ game.timeStart }}</div>
          <v-icon>{{ game.active ? "mdi-chevron-up" : "mdi-chevron-down"}}</v-icon>
        </div>
        <transition-expand>
          <shopping-cart-item v-if="game.active" :itemData="game"></shopping-cart-item>
        </transition-expand>
      </div>
    </div>
  </div>
</template>

<script>
import ViewHeader from '@/components/ViewHeader.vue';
import TransitionExpand from '@/components/TransitionExpand.vue';
import ShoppingCartItem from '@/components/ShoppingCartItem.vue';

const mockUpcomingGames = [
  {
    venue: 'Kallang',
    field: '5-A-Side',
    pitch: 'Pitch 4',
    timeStart: '22/10/2019 15:00',
    timeEnd: '22/10/2019 17:00',
    product: 'Online Premium',
    amount: '92.00',
    active: false,
  },
];

export default {
  name: 'UpcomingGames',
  data() {
    return {
      upcomingGames: [],
    };
  },
  components: {
    ViewHeader,
    TransitionExpand,
    ShoppingCartItem,
  },
  mounted() {
    this.upcomingGames = mockUpcomingGames;
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 80%;
  margin: 40px auto;

  .game {
    margin-bottom: 20px;
  }

  .collapsable {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    background-color: #e9e9e9;
    border: 1px solid #707070;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
