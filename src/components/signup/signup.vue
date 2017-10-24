<template>
  <div class="signup">
    <div class="header">
      <div class="header-to" @click="prev"></div>
      <div class="logo"></div>
    </div>
    <div class="login">
      <div><label>手机号:</label><input class="account" placeholder="请输入手机号" type="text">
        <div @click="getCode" v-if="show">验证码:{{verifyCode}}</div>
        <div @click="getCode" v-else>{{verifyCode}}</div>
      </div>
      <div><label>验证码:</label><input class="verify" type="text"></div>
      <div><label>密&nbsp;&nbsp;&nbsp;&nbsp;码:</label><input class="password" placeholder="6-20位字母、数字、符号组成" type="password">
      </div>
    </div>
    <div class="confirm" @click="confirm">注册</div>
  </div>
</template>

<script>
  import router from '../../router'

  export default {
    name: '',
    data() {
      return {
        verifyCode: '获取验证码',
        show: false
      }
    },
    methods: {
      prev() {
        window.history.go(-1)
      },
      getCode() {
        var codes = ''
        for (let i = 0; i < 4; i++) {
          var code = parseInt(Math.random() * 10)
          if (code < 10) {
            codes += code
          } else {
            codes += 0
          }
        }
        this.show = true
        let self = this
        setTimeout(function () {
          self.verifyCode = '获取验证码'
          self.show = false
        }, 60000)
        this.verifyCode = codes
      },
      confirm() {
        let password = document.getElementsByClassName('password')[0]
        let account = document.getElementsByClassName('account')[0]
        let verify = document.getElementsByClassName('verify')[0]
        let pass = true
        let telReg = /^1[3458][0-9]\d{8}$/
        for (let i = 0; i < localStorage.length; i++) {
          if (account.value === localStorage.key(i)) {
            pass = false
          }
        }
        if (telReg.test(account.value) && verify.value === this.verifyCode && pass) {
          const newAccount = {
            account: account.value,
            password: password.value
          }
          localStorage.setItem(account.value, JSON.stringify(newAccount))
          alert('注册成功')
          router.push('/login')
        } else {
          alert('该手机号码已注册或验证码不正确')
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .signup {
    background: #f6f6f6;
    height: 485px;
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
      margin-top: 20px;
      background: white;
      box-shadow: 0 3px 3px rgba(51, 51, 51, 0.1);
      div {
        display: flex;
        align-items: center;
        margin-left: 16px;
        height: 48px;
        width: 359px;
        line-height: 58px;
        border-bottom: 1px solid #D9D9D9;
        label {
          margin-right: 10px;
          text-align: right;
          color: #777777;
          flex: 0 0 70px;
          width: 70px;
        }
        input {
          flex: 1 1 134px;
          width: 134px;
          padding: 8px 0px;
          outline: none;
          border: none;
          font-size: 16px;
        }
        div {
          display: inline-block;
          margin: 0;
          margin-right: 20px;
          text-align: center;
          width: 100px;
          height: 35px;
          line-height: 35px;
          border: 1px solid #0b7dc3;
          color: #0b7dc3;
          background: white;
          border-radius: 20px;
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
  }
</style>
