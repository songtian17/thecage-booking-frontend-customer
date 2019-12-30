<template>
  <div>
    <view-header :main="true">
      THE CAGE <br />
      BOOKING SYSTEM
    </view-header>
    <div class="home">
      <div v-if="announcement1.visible" class="announcement" v-html="announcement1.html"></div>
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
      <div v-if="announcement2.visible" class="announcement" v-html="announcement2.html"></div>
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
      announcement1: {
        html: '',
        visible: false,
      },
      announcement2: {
        html: '',
        visible: false,
      },
      venues: [],
    };
  },
  methods: {
    fetchVenues() {
      this.$axios.get(`${process.env.VUE_APP_API}/venues`).then((res) => {
        const { data } = res;
        this.venues = data.map(venue => Object.assign(venue, { active: false }));
      });
    },
    fetchAnnouncements() {
      this.$axios.get(`${process.env.VUE_APP_API}/announcement`).then((res) => {
        const { data } = res;
        data.forEach((announcement) => {
          if (announcement.placement === 'Top') {
            this.announcement1.html = announcement.html_string;
            this.announcement1.visible = announcement.visibility;
          } else if (announcement.placement === 'Bottom') {
            this.announcement2.html = announcement.html_string;
            this.announcement2.visible = announcement.visibility;
          }
        });
      });
    },
  },
  components: {
    ViewHeader,
    TransitionExpand,
  },
  mounted() {
    this.fetchVenues();
    this.fetchAnnouncements();
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
    margin: 0.4em 2em;

    a {
      @include montserrat($h4, 500);
      color: black;
      text-decoration: none;
    }
  }
}
</style>
