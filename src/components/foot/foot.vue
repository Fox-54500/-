<template>
  <div class="footer">
    <div class="NAV">
      <ul>
        <li>
          <router-link to="/home">首页</router-link>
        </li>
        <li>
          <router-link to="/buyticket">购票</router-link>
        </li>
        <li>
          <router-link to="/mall">商城</router-link>
        </li>
        <li>
          <router-link to="/find">发现</router-link>
        </li>
        <li>
          <router-link v-if="valueUser" to="/person">我的</router-link>
          <router-link v-else to="/login">我的</router-link>
        </li>
      </ul>
    </div>
    <div class="about">
      <ul>
        <li>
          <router-link to=""><span>PC版</span></router-link>
        </li>
        <li>
          <router-link to=""><span>客户端下载</span></router-link>
        </li>
        <li>
          <router-link to=""><span>意见反馈</span></router-link>
        </li>
        <li>
          <router-link to=""><span>帮助中心</span></router-link>
        </li>
      </ul>
      <p></p>
      <p>
        <span>Copyright </span>
        <span class="copytime">2006-2017</span>
        <span> Mtime.com Inc. All rights reserved.</span>
      </p>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    data() {
      return {
        msg: ''
      }
    },
    computed: {
      ...mapGetters(['valueUser'])
    }
  }
</script>
<style lang="less" scoped>
  .footer {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #f6f6f6;
    div.NAV {
      ul {
        display: flex;
        justify-content: space-around;
        li {
          a {
            font-size: 18px;
            color: #4997d4;
          }
        }
      }
    }
    div.about {
      background: #f6f6f6;
      width: 100%;
      height: 100px;
      ul {

        margin-top: 20px;
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        li {
          flex: 0 1 auto;
          display: flex;
          padding: 0px 19px 0px 19px;
          justify-content: center;
          border-right: 1px solid #8b8b8b;
          &:last-child {
            border: none;
          }
          a {
            display: inline-block;
            margin: 0 auto;
            span {
              display: inline-block;
              width: 110%;
              text-align: center;
              color: black;
              font-size: 14px;
              font-weight: 400;
            }
          }
        }

      }
      p {
        margin-top: 10px;
        width: 100%;
        height: 30px;
        background: url("http://static1.mtime.cn/html5/20170921140022/images/2014/fot_logo.png") no-repeat center center;
        background-size: auto 1.5em;
        background-repeat: no-repeat;
        &:last-child {
          margin: 0;
          text-align: center;
          font-size: 12px;
          color: #CCCCCC;
          background: none;
        }
      }
    }
  }
</style>
