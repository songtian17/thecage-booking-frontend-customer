<template>
  <div id="home">
    <view-header :main="true">
      THE CAGE <br />
      BOOKING SYSTEM.
    </view-header>
    <div class="home">
      <div v-if="topAnnouncement" class="announcement" v-html="topAnnouncement"></div>
      <div class="main">
        <h1>Book Now!</h1>
        <hr />
        <div class="venue-list">
          <div v-for="venue in venues" :key="venue.name" class="venue">
            <div
              v-if="venue.fields.length"
              class="collapsable"
              @click="venue.active = !venue.active"
            >
              {{ venue.name }} Calendar
              <v-icon>{{ venue.active ? "mdi-minus" : "mdi-plus" }}</v-icon>
            </div>
            <transition-expand>
              <div v-if="venue.active" class="field-list">
                <div v-for="field in venue.fields" :key="field.id" class="field">
                  <router-link :to="`calendar/${field.id.toString()}`">{{
                    field.field_type
                  }}</router-link>
                </div>
              </div>
            </transition-expand>
          </div>
        </div>
        <hr />
      </div>
      <p class="home-info">
        For bookings less than 12 hours and beyond 60 days, please call our hotline at 6344 9345
        between 10am and 11pm daily.
      </p>
      <div v-if="bottomAnnouncement" class="announcement" v-html="bottomAnnouncement"></div>
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
      venues: [],
    };
  },
  computed: {
    topAnnouncement() {
      return this.$store.getters['home/topAnnouncement'];
    },
    bottomAnnouncement() {
      return this.$store.getters['home/bottomAnnouncement'];
    },
  },
  methods: {
    fetchVenues() {
      this.$axios.get('/venues').then((res) => {
        const { data } = res;
        this.venues = data.map(venue => Object.assign(venue, { active: false }));
      });
    },
  },
  components: {
    ViewHeader,
    TransitionExpand,
  },
  mounted() {
    this.fetchVenues();
    if (this.$store.getters['home/isEmpty']) {
      this.$store.dispatch('home/fetchAnnouncements');
    }
    if (!this.$store.getters['cart/products'].length) {
      this.$store.dispatch('cart/fetchProducts');
    }
  },
};
</script>

<style lang="scss" scoped>
hr {
  border: 1px solid #c2c2c2;
}
#home .v-application p {
  font-size: 14px;
}
.home {
  margin: 0 60px;
}
.announcement {
  @include montserrat(18px, 600);
  margin: 40px 0;
  p {
    font-size: 14px;
  }
}
.home-info{
    @include montserrat(16px, 600);
    margin-top: 25px;
}
.venue {
  margin: 20px 40px;

  .collapsable {
    @include montserrat($h3, 600);
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
    margin: 15px 30px;

    a {
      @include montserrat($h4, 500);
      color: black;
      text-decoration: none;
    }
  }
}

@media (max-width: 720px) {
  .home{
    margin: 0 20px;
  }
  .announcement{
    margin:30px 0;
  }
  .venue{
    margin: 20px 15px;
    .collapsable{
      font-size: 16px;
    }
    .field{
      margin: 10px 25px;
    }
    .field a{
      font-size: 14px;
    }
  }
}
</style>
