<template>
  <div>
    <v-footer dark padless>
      <v-card flat tile class="white--text text-center" width="100%">
        <v-card-text id="connect-with-us" class="pb-2 white--text">
          CONNECT WITH US
        </v-card-text>
        <v-card-text class="contact pt-0 pb-1 white--text">
          <v-icon>mdi-phone</v-icon>
          +65 6344 9345
        </v-card-text>
        <v-card-text class="contact pt-0 white--text">
          <v-icon>mdi-email</v-icon>
          iwannaplay@thecage.com.sg
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="copyright py-2 white--text">
          Copyright @ The Cage Events Pte Ltd
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
.v-card {
  color: #292a2e;
}

#connect-with-us {
  @include montserrat(16px, 600);
}

.contact {
  @include montserrat(14px, 400);
}

.copyright {
  @include montserrat(12px, 400);
  background-color: black;
}
</style>
