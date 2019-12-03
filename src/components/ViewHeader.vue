<template>
  <div class="header">
    <p>
      THE CAGE <br />
      BOOKING SYSTEM.
    </p>
  </div>
</template>

<script>
export default {
  name: 'ViewHeader',
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: $primary;

  p {
    padding: 40px 24px;
    font-family: "Montserrat", sans-serif;
    font-size: 23px;
    font-weight: 700;
    color: white;
  }
}
</style>
