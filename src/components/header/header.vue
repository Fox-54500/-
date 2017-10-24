<template>
  <div class="header">
    <ul>
      <li class="appLogo">
        <div class="logo"></div>
      </li>
      <li>
        <router-link to="/home"><span>首页</span></router-link>
      </li>
      <li>
        <router-link to="/buyticket"><span>购票</span></router-link>
      </li>
      <li>
        <router-link to="/mall"><span>商城</span></router-link>
      </li>
      <li>
        <router-link to="/find"><span>发现</span></router-link>
      </li>
      <li>
        <router-link class="login" v-if="valueUser" to="/person"></router-link>
        <router-link class="login" v-else to="/login"></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['valueUser'])
    }
  }
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    height: 53px;
    background-color: #1c2635;
    ul {
      li {
        width: 58.6px;
        display: flex;
        justify-content: center;
        &:first-child {
          width: 95px;
          .logo {
            width: 67px;
            height: 22px;
            background-image: url("http://static1.mtime.cn/html5/20170921140022/images/2014/logo_mtime.png");
            background-size: contain;
            background-repeat: no-repeat;
          }
        }
        &:last-child {
          width: 45px;
          .login {
            width: 17px;
            height: 22px;
            background-image: url("http://static1.mtime.cn/html5/20170921140022/images/2014/ico_my.png");
            background-size: contain;
            background-repeat: no-repeat;
            border: none !important;
          }
        }
        float: left;
        display: flex;
        align-items: center;
        line-height: 50px;
        height: 52px;
        a {
          height: 51px;
          display: block;
          &.active {
            span {
              color: white;
              font-weight: 700;
            }
            & {
              border-bottom: 3px solid white;
            }

          }
        }
        span {
          text-align: center;
          font-size: 15px;
          color: #d5d9df;
        }
      }
    }
  }
</style>
