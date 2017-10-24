<template>
  <div class="img-list">
    <div class="header">
      <div class="header-to" @click="prev"></div>
      <div class="header-all">
        {{$route.query.name}}
      </div>
    </div>
    <div class="list">
      <ul>
        <li class="imgLi" v-for="(item, index) in still.images">
          <div @click="zoom(index)">
            <img :src="item.image">
            <p class="close">&times;</p>
          </div>
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
        still: {},
        show: false
      }
    },
    methods: {
      zoom(index) {
        var li = document.getElementsByClassName('imgLi')
        li[index].childNodes[0].childNodes[2].style.visibility = 'visible'
        li[index].childNodes[0].className = 'active'
        li[index].childNodes[0].childNodes[0].style.marginTop = -(li[index].childNodes[0].childNodes[0].offsetHeight) / 2 + 'px'
        li[index].childNodes[0].childNodes[0].style.marginLeft = -(li[index].childNodes[0].childNodes[0].offsetWidth) / 2 + 'px'
        li[index].childNodes[0].childNodes[2].onclick = function (e) {
          for (let i = 0; i < li.length; i++) {
            li[i].childNodes[0].className = ''
          }
          li[index].childNodes[0].childNodes[2].style.marginTop = 0
          li[index].childNodes[0].childNodes[2].style.marginLeft = 0
          li[index].childNodes[0].childNodes[2].onclick = null
          li[index].childNodes[0].childNodes[2].style.visibility = 'hidden'
          e.stopPropagation()
        }
      },
      prev() {
        window.history.go(-1)
      }
    },
    created() {
      this.still = this.$route.query.still
    }
  }
</script>
<style lang="less" scoped>
  .img-list {
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
    div.list {
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          margin-top: 6px;
          margin-left: 3px;
          div {
            width: 88px;
            height: 88px;
            overflow: hidden;
            img {
              width: 250px;
            }
          }
          div.active {
            position: fixed;
            left: 0px;
            top: 0px;
            width: 375px;
            height: 667px;
            background: rgba(7, 17, 27, 0.9);
            img {
              display: block;
              position: absolute;
              left: 50%;
              top: 50%;
              width: 350px;
              margin: 20px auto;
            }
            p.close {
              position: absolute;
              left: 42%;
              visibility: hidden;
              bottom: 30px;
              height: 50px;
              width: 50px;
              font-size: 45px;
              border-radius: 50%;
              font-weight: lighter;
              color: #FFFFFF;
              text-align: center;
              line-height: 45px;
              background: rgba(16, 16, 16, 0.8);
            }
          }
        }
      }
    }
  }
</style>
