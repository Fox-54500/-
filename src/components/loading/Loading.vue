<template>
  <div class="loading">
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="less" scoped>
  .loading {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    background: url("../../assets/123.gif") no-repeat center center;
    background-color: #ffffff;
    background-size: 40%;
    width: 100%;
    height: 100%;
  }
</style>
