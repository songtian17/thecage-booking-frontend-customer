<template>
  <div class="header" :class="{ main }">
    <slot></slot>
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
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: $primary;
  padding: 20px 24px;
  @include montserrat(20px, 600);
  color: white;

  &.main {
    padding: 40px 24px;
    @include montserrat(22px, 700);
  }
}
</style>
