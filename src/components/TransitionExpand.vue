<template>
  <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'TransitionExpand',
  methods: {
    enter(element) {
      const { width } = getComputedStyle(element);
      /* eslint no-param-reassign: "error" */
      element.style.width = width;
      element.style.position = 'absolute';
      element.style.visibility = 'hidden';
      element.style.height = 'auto';

      const { height } = getComputedStyle(element);
      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;

      // Force repaint to make sure animation is triggered correctly
      getComputedStyle(element).height; // eslint-disable-line no-unused-expressions

      // Trigger animation
      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
    leave(element) {
      const { height } = getComputedStyle(element);
      element.style.height = height;

      getComputedStyle(element).height; // eslint-disable-line no-unused-expressions

      setTimeout(() => {
        element.style.height = 0;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.expand-enter-active, .expand-leave-active {
  transition: height 0.1s linear;
  overflow: hidden;
}

.expand-enter, .expand-leave-to {
  height: 0;
}
</style>
