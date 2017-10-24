<template>
  <div id="app">
    <router-view></router-view>
    <foot></foot>
    <transition name="gotoTop">
      <div id="goto-top" v-if="show" onclick="window.scrollTo(0,0);" class="return_top"></div>
    </transition>
  </div>
</template>

<script>
  import foot from './components/foot/foot.vue'

  export default {
    name: 'app',
    data() {
      return {
        show: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 1500) {
            this.show = true
          } else {
            this.show = false
          }
        })
      })
    },
    beforeCreate() {
      window.scrollTo(0, 0)
    },
    methods: {},
    components: {
      foot
    }
  }
</script>


<style lang="less">
  #app {
    overflow: hidden;
    #goto-top {
      position: fixed;
      height: 50px;
      width: 50px;
      background: url(//static1.mtime.cn/html5/20170921140022/images/2014/backtop1.png) no-repeat center bottom;
      background-size: 80%;
      right: 20px;
      bottom: 30px;
      &.gotoTop-enter-active, &.gotoTop-leave-active {
        transition: all 0.5s;
      }
      &.gotoTop-enter, &.gotoTop-leave-to {
        opacity: 0;
        transform: translateY(100px);
      }
    }
  }

</style>
