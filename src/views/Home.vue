<template>
  <div>
    <view-header></view-header>
    <div class="home">
      <div class="announcement" v-html="announcement1"></div>
      <div class="main">
        <h1>Book Now!</h1>
        <hr />
        <div class="venue-list">
          <div v-for="venue in venues" :key="venue.name" class="venue">
            <div class="collapsable" @click="venue.active = !venue.active">
              {{ venue.name }} Calendar
              <v-icon>{{ venue.active ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
            </div>
            <transition-expand>
              <div v-if="venue.active" class="field-list">
                <div v-for="field in venue.fields" :key="field.id" class="field">
                  <router-link :to="field.id">{{ field.name }}</router-link>
                </div>
              </div>
            </transition-expand>
          </div>
        </div>
        <hr />
      </div>
      <div class="announcement" v-html="announcement2"></div>
    </div>
  </div>
</template>

<script>
import ViewHeader from '@/components/ViewHeader.vue';
import TransitionExpand from '@/components/TransitionExpand.vue';

export default {
  name: 'home',
  data() {
    return {
      // TODO: replace mock data with data from backend
      announcement1:
        '<h1>Hot Deals!</h1><p>Special 30% discount for students now!</p>',
      announcement2:
        '<h1>News</h1><p>Kalling 5-A-Side field will be shortly closed due to maintenance</p>',
      venues: [
        {
          name: 'Kallang',
          fields: [
            {
              name: '5-A-Side',
              id: 'kallang5',
            },
            {
              name: '7-A-Side',
              id: 'kallang7',
            },
          ],
          active: false,
        },
        {
          name: 'Bukit Timah',
          fields: [
            {
              name: '5-A-Side',
              id: 'bt5',
            },
            {
              name: '7-A-Side',
              id: 'bt7',
            },
          ],
          active: false,
        },
      ],
    };
  },
  components: {
    ViewHeader,
    TransitionExpand,
  },
};
</script>

<style lang="scss" scoped>
hr {
  border: 1px solid #c2c2c2;
}

.home {
  margin-left: 24px;
  margin-right: 64px;

  @media screen and (max-width: 400px) {
    margin-left: 24px;
    margin-right: 24px;
  }
}

.announcement {
  margin-top: 30px;
  margin-bottom: 14px;
}

.venue {
  margin: 14px 40px;

    @media screen and (max-width: 400px) {
      margin: 14px 0;
    }

  .collapsable {
    @include montserrat(18px, 600);
    color: $primary;

    &:hover {
      cursor: pointer;
    }
  }

  i {
    float: right;
    color: $primary;
  }

  .field {
    margin: 0.4em 2em;


    a {
      @include montserrat(18px, 500);
      color: black;
      text-decoration: none;
    }
  }
}
</style>
