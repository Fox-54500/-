<template>
  <div class="person">
    <div class="header">
      <div class="headImage">
      </div>
      <div>{{valueUser}}</div>
    </div>
    <div class="shop">
      <div>
        <router-link to="">购物车</router-link>
      </div>
      <div>
        <router-link to="">电影票订单</router-link>
      </div>
      <div>
        <router-link to="">商品订单</router-link>
      </div>
    </div>
    <p></p>
    <div class="item">
      <ul>
        <li>
          <div>我的商品优惠券</div>
          <i></i></li>
        <li>
          <div>我的活动</div>
          <i></i></li>
        <li>
          <div>我的电影</div>
          <i></i></li>
        <li>
          <div>我的收藏</div>
          <i></i></li>
      </ul>
      <p></p>
      <ul>
        <li>
          <div>意见反馈</div>
          <i></i></li>
        <li>
          <div>商城使用帮助</div>
          <i></i></li>
      </ul>
    </div>
    <div class="logout" @click="logout">退出登录</div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import router from '../../router'

  export default {
    name: '',
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['valueUser'])
    },
    methods: {
      ...mapMutations(['logOut']),
      logout() {
        this.logOut()
        router.push('/home')
      }
    }
  }
</script>
<style lang="less" scoped>
  .person {
    .header {
      display: flex;
      align-items: center;
      height: 180px;
      padding: 0px 25px;
      background: linear-gradient(to left bottom, #9a004d, #0d0041, #38004b);
      div {
        margin: 0 10px;
        padding: 0;
        background: none;
        color: white;
      }
      .headImage {
        border-radius: 50%;
        width: 80px;
        height: 80px;
        background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507263021887&di=9c6fbac640426729f4a33a5375229390&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fbbs4%2F20096%2F14%2F1244924685911.jpg") no-repeat center;
        background-size: 150%;
      }
    }
    .shop {
      display: flex;
      margin-top: 20px;
      justify-content: space-around;
      height: 100px;
      box-shadow: 0 3px 3px rgba(51, 51, 51, 0.1);
      div {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        a {
          display: inline-block;
          padding-top: 70px;
          width: 100px;
          font-size: 14px;
          text-align: center;
          transform: translate3d(-23px, -10px, 0);
        }
      }
      div:nth-of-type(1) {
        background: #ffb059 url(//static1.mtime.cn/html5/20170921140022/images/2014/i_cate.png) no-repeat center;
        background-size: 100%;

      }
      div:nth-of-type(2) {
        background: #78bdfd url(//static1.mtime.cn/html5/20170921140022/images/2014/i_movie.png) no-repeat center;
        background-size: 50%;
      }
      div:nth-of-type(3) {
        background: #ff815a url(//static1.mtime.cn/html5/20170921140022/images/2014/i_shop.png) no-repeat center;
        background-size: 50%;
      }

    }
    p {
      margin-top: 3px;
      background: #f9f9f9;
      height: 12px;
    }
    .item {
      ul {
        padding-left: 20px;
        box-shadow: 0 3px 3px rgba(51, 51, 51, 0.1);
        li {
          display: flex;
          justify-content: space-between;
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #D9D9D9;
          &:nth-of-type(4) {
            border: none;
          }
          &:last-of-type {
            border: none;
          }
          div {
            font-size: 18px;
          }
          i {
            display: inline-block;
            height: 50px;
            width: 50px;
            transform: rotate(-90deg);
            background: #fff url(//static1.mtime.cn/html5/20170921140022/images/2014/i-tmore.png) no-repeat center center;
            background-size: 40%;
          }
        }
        p {
          padding-right: 60px;
          width: 100%;
          transform: translateX(-20px);
        }
      }
    }
    .logout {
      margin: 20px 20px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      color: white;
      background: #f13900;
      border-radius: 25px;
    }
  }
</style>
