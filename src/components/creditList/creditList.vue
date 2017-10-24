<template>
  <div class="credit">
    <div class="header">
      <div class="header-to" @click="prev"></div>
      <div class="header-all">
        演职员表
      </div>
    </div>
    <div>
      <ul>
        <li v-for="items in credit.types">
          <div class="title">{{items.typeName}}</div>
          <ul>
            <li v-for="item in items.persons">
              <div class="image"><img :src="item.image"></div>
              <div class="content">
                <div>{{item.name}}</div>
                <div>{{item.nameEn}}</div>
                <div>{{item.personate}}</div>
              </div>
              <div class="role-image" v-if="item.roleCover"><img :src="item.roleCover" alt=""></div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        credit: {}
      }
    },
    methods: {
      prev() {
        window.history.go(-1)
      }
    },
    created() {
      this.credit = this.$route.query.credit
    }
  }
</script>
<style lang="less" scoped>
  .credit {
    .header {
      display: flex;
      height: 50px;
      background: #1c2635;
      .header-to {
        position: absolute;
        width: 50px;
        height: 50px;
        background: url('http://static1.mtime.cn/html5/20170921140022/images/2014/h_btn_back.png') no-repeat center center;
        background-size: 20%;
        /*transform: rotate(90deg);*/
      }
      .header-all {
        margin: 0 auto;
        line-height: 50px;
        font-size: 18px;
        color: white;
      }
    }
    div {
      ul {
        li {
          .title {
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            text-indent: 20px;
            color: #999999;
            background: #f6f6f6;
            border-bottom: 1px solid #d8d8d8;
            border-top: 1px solid #d8d8d8;
          }
          ul {
            padding: 0 15px;
            li {
              display: flex;
              align-items: center;
              padding: 20px 0;
              border-bottom: 1px solid #d8d8d8;
              &:last-child {
                border-bottom: none;
              }
              div.image {
                width: 72px;
                height: 72px;
                overflow: hidden;
                img {
                  width: 72px;
                }
              }
              div.content {
                display: flex;
                flex-direction: column;
                height: 60px;
                justify-content: space-around;
                margin-left: 20px;
                div {
                  &:nth-child(1) {
                    font-size: 17px;
                    font-weight: 600;
                  }
                  &:nth-child(2) {
                    font-size: 14px;
                    color: #bbbbca;
                  }
                  &:nth-child(3) {
                    font-size: 13px;
                  }
                }
              }
              .role-image{
                position: absolute;
                right: 20px;
                img{
                  width: 72px;
                  height: 72px;
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
