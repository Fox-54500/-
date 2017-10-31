<template>
  <div class="distress">
    <Loading v-if="!area"></Loading>
    <div class="header">
      <div class="header-to" @click="prev"></div>
      <div class="header-all">
        选择城市
      </div>
    </div>
    <div class="input">
      <input class="search-input" placeholder="请输入搜索关键词" ref="input" @keyup="search" type="text">
    </div>
    <div class="hotArea">
      <div class="title">热门城市:</div>
      <ul>
        <li v-for="item in hotAreas">
          <router-link :to="{path:'/home',query:{locationID:item.id, cityN: item.n}}">{{item.n}}</router-link>
        </li>
      </ul>
    </div>
    <div class="cityArea">
      <ul>
        <li v-for="(items,index) in cityAreas">
          <div class="title">{{index}}</div>
          <ul>
            <li v-for="item in items">
              <div>
                <router-link :to="{path:'/home',query:{locationID:item.id, cityN: item.n}}">{{item.n}}</router-link>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="search-list" ref="search">
      <ul>
        <li v-for="item in searchList">
          <div>{{item.n}}<span>{{item.pinyinFull}}</span>
            <router-link :to="{path:'/home',query:{locationID:item.id, cityN: item.n}}"></router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
  import IScroll from 'iscroll/build/iscroll-probe'
  import Loading from '../loading/Loading.vue'

  export default {
    data() {
      return {
        area: null,
        ...mapState(['list'])
      }
    },
    computed: {
      ...mapGetters(['cityAreas', 'hotAreas', 'searchList'])
    },
    created() {
      setTimeout(() => {
        this.$http.get('/area').then((res) => {
          this.area = res.body.p
          this.filterPos(this.area)
        })
      }, 1000)
      this.$nextTick(() => {
        this.searchWrapper = new IScroll(this.$refs.search, {
          click: true
        })
      })
    },
    updated() {
      this.$nextTick(() => {
        this.searchWrapper.refresh()
      })
    },
    beforeDestroy() {
      this.emptyList()
    },
    methods: {
      ...mapActions(['searchByVal']),
      ...mapMutations(['filterPos', 'emptyList']),
      prev() {
        window.history.go(-1)
      },
      search() {
        this.searchByVal({value: this.$refs.input.value, area: this.area})
      }
    },
    components: {
      Loading
    }
  }
</script>
<style lang="less" scoped>
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

  div.input {
    display: flex;
    align-items: center;
    height: 60px;
    background: #f6f6f6;
    border-bottom: 1px solid #d8d8d8;
    .search-input {
      display: flex;
      align-items: center;
      margin: 10px auto;
      padding: 0 29px 0 33.8px;
      width: 60%;
      height: 43px;
      font-size: 16px;
      background: #fff url("http://static1.mtime.cn/html5/20170921140022/images/2014/search_ico_01.png") .5em center no-repeat;
      background-size: 21px;
      border: 1px solid #d8d8d8;
      border-radius: 10px;
      outline: none;
    }
  }

  .hotArea {
    div.title {
      color: #777777;
      width: 100%;
      height: 35px;
      font-size: 18px;
      line-height: 35px;
      text-indent: 18px;
      background: #ebebeb;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      margin: 15px 3px;
      li {
        padding: 10px 14px;
        a {
          display: inline-block;
          color: #333333;
          width: 60px;
          font-size: 18px;
        }
      }
    }
  }

  .cityArea {
    ul {
      li {
        div.title {
          color: #777777;
          width: 100%;
          height: 30px;
          font-size: 18px;
          line-height: 30px;
          text-indent: 15px;
          background: #ebebeb;
        }
        ul {
          margin: 10px 0;
          display: flex;
          flex-wrap: wrap;
          li {
            padding: 10px 14px;
            width: 60px;
            a {
              display: inline-block;
              color: #333333;
              width: 80px;
              font-size: 18px;
            }
          }
        }
      }
    }
  }

  .search-list {
    position: absolute;
    padding: 0 10px;
    top: 103px;
    left: 14%;
    width: 250px;
    max-height: 440px;
    overflow: hidden;
    border: 1px solid #D9D9D9;
    border-top: none;
    background: white;
    ul {
      li {
        padding: 10px 0;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #D9D9D9;
        div {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          span {
            font-size: 15px;
            color: #999999;
          }
          a {
            position: absolute;
            height: 35px;
            width: 90%;
          }
        }
      }
    }
  }
</style>
