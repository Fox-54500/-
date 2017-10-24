<template>
  <div class="person">
    <div class="header">
      <div class="header-to" @click="prev"></div>
      <div class="logo"></div>
    </div>
    <div class="login">
      <i></i>
      <div><input class="account" placeholder="登录邮箱/手机号码" type="text"></div>
      <i></i>
      <div><input class="password" placeholder="密码" type="password"></div>
    </div>
    <div class="confirm" @click="confirm">登录</div>
    <div class="help">
      <div>
        <router-link to="/signup">免费注册</router-link>
      </div>
      <div>
        <router-link to="">找回密码</router-link>
      </div>
    </div>
    <div class="other">
      <span>使用第三方登录</span>
      <div>
        <div>
          <router-link to=""></router-link>
        </div>
        <div>
          <router-link to=""></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../../router'
  import {mapMutations} from 'vuex'

  export default {
    name: '',
    data() {
      return {}
    },
    methods: {
      ...mapMutations(['chargeUser']),
      prev() {
        window.history.go(-1)
      },
      confirm() {
        let password = document.getElementsByClassName('password')[0]
        let account = document.getElementsByClassName('account')[0]
        let verify = false
        for (let i = 0; i < localStorage.length; i++) {
          if (account.value === localStorage.key(i)) {
            let item = localStorage.getItem(account.value)
            let itemObj = JSON.parse(item)
            if (password.value === itemObj.password) {
              verify = true
            }
          }
        }
        if (verify) {
          this.chargeUser(account.value)
          alert('登录成功')
          router.push('/home')
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .person {
    background: #f6f6f6;
    height: 667px;
    .header {
      display: flex;
      align-items: center;
      height: 55px;
      background: #1c2635;
      .header-to {
        position: absolute;
        width: 50px;
        height: 50px;
        background: url('http://static1.mtime.cn/html5/20170921140022/images/2014/h_btn_back.png') no-repeat center center;
        background-size: 20%;
        /*transform: rotate(90deg);*/
      }
      .logo {
        margin: 0 auto;
        width: 65px;
        height: 25px;
        background-image: url("http://static1.mtime.cn/html5/20170921140022/images/2014/logo_mtime.png");
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
    .login {
      width: 100%;
      background: white;
      box-shadow: 0 3px 3px rgba(51, 51, 51, 0.1);
      i {
        position: absolute;
        width: 24px;
        height: 24px;
        transform: translate3d(30px, 15px, 0);
        background: url(//static1.mtime.cn/html5/20170921140022/images/2014/i_user.png) no-repeat;
        background-size: contain;
        &:last-of-type {
          background: url(//static1.mtime.cn/html5/20170921140022/images/2014/i_password.png) no-repeat;
          background-size: contain;
        }
      }
      div {
        margin-left: 66px;
        height: 58px;
        border-bottom: 1px solid #D9D9D9;
        &:last-child {
          border: none;
        }
        input {
          padding: 18px 0;
          outline: none;
          border: none;
          font-size: 18px;
        }
      }
    }
    .confirm {
      margin: 20px;
      height: 50px;
      text-align: center;
      font-size: 20px;
      line-height: 50px;
      border-radius: 25px;
      background: #1e7dd7;
      color: #FFFFFF;
    }
    .help {
      display: flex;
      justify-content: space-between;
      margin: 20px 25px;
      div:first-child {
        a {
          color: #0b7dc3;
          font-weight: 600;
        }
      }
      div:last-child {
        color: #777777;
      }
    }
    .other {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 20px;
      height: 100px;
      border-top: 1px solid #cccccc;
      span {
        display: inline-block;
        transform: translateY(-8px);
        width: 120px;
        height: 14px;
        text-align: center;
        font-size: 14px;
        color: #9b9b9b;
        background: #f6f6f6;
      }
      div {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        width: 162px;
        div:first-of-type {
          width: 66px;
          height: 66px;
          background: url(//static1.mtime.cn/html5/20170921140022/images/2014/o_sina.png) no-repeat;
          background-size: contain;
          a {
            display: inline-block;
            width: 66px;
            height: 66px;
          }
        }
        div:last-of-type {
          width: 66px;
          height: 66px;
          background: url(//static1.mtime.cn/html5/20170921140022/images/2014/o_qq.png) no-repeat;
          background-size: contain;
          a {
            display: inline-block;
            width: 66px;
            height: 66px;
          }
        }
      }
    }
  }
</style>
