<template>
  <div class="header" :class="{ main }">
    <div class="header-title">
      <slot></slot>
    </div>
    <div v-if="countdown" class="timer">
      <div>
        {{ countdown }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewHeader',
  props: {
    main: {
      default: () => true,
      type: Boolean,
    },
    timer: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    countdown() {
      return this.$store.getters['timer/countdown'];
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: $primary;
  position: relative;
}

.header-title {
  @include montserrat(32px, 700);
  color: white;
  padding: 40px 60px;
  line-height: 40px;

  &.main {
    @include montserrat($h1, 700);
    padding: 40px 24px;
  }
}

.timer {
  @include montserrat($h3, 500);
  background-color: black;
  color: white;
  position: absolute;
  top: 0;
  right: 0;
  padding-left: 24px;
  padding-right: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

@media (max-width: 720px){
  .header-title {
    font-size: 28px;
    line-height: 36px;
    padding: 35px 20px;
  }
}
</style>
