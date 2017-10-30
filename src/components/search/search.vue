<template>
  <div class="search-rect">
    <div class="distress">
      <router-link :to="{path:'/distress'}"><span>{{city}}</span></router-link>
      <p></p>
    </div>
    <div class="search-input">
      <input type="text" placeholder="影片/影人 , 任你搜" @keyup="searchInput">
      <div class="search-list" ref="listWrapper" v-if="searchLists.length">
        <ul>
          <li v-for="item in searchLists">
            <div>
              <div class="item-1">{{item.name}}
                <div>{{item.director}}</div>
              </div>
              <div class="item-2">主演: {{item.actor}}</div>
              <router-link
                :to="{path:'/details',query:{movieID:item.id, locationID:locationID||$route.query.locationID}}"></router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import IScroll from 'iscroll/build/iscroll-probe'

  export default {
    name: '',
    props: {
      locationID: {},
      city: {}
    },
    data() {
      return {
        allMovie: []
      }
    },
    computed: {
      ...mapGetters(['searchLists'])
    },
    methods: {
      ...mapActions(['getSearchVal']),
      ...mapMutations(['clearSearch']),
      searchInput() {
        let val = document.getElementsByClassName('search-input')[0].childNodes[0]
        this.getSearchVal({val: val.value, list: this.allMovie})
      }
    },
    beforeDestroy() {
      this.clearSearch()
    },
    created() {
      if (this.locationID) {
        this.$http.get('/upcoming?locationId=' + this.locationID + '').then((res) => {
          if (res.ok) {
            for (let i = 0; i < res.body.moviecomings.length; i++) {
              const Obj = {
                id: res.body.moviecomings[i].id,
                name: res.body.moviecomings[i].title,
                director: res.body.moviecomings[i].director,
                actor: res.body.moviecomings[i].actor1 + ' / ' + res.body.moviecomings[i].actor2,
                type: res.body.moviecomings[i].type,
                releaseDate: res.body.moviecomings[i].releaseDate
              }
              this.allMovie.push(Obj)
            }
          }
        })
        this.$http.get('/hotPlay?locationId=' + this.locationID + '').then((res) => {
          if (res.ok) {
            for (let i = 0; i < res.body.ms.length; i++) {
              const Obj = {
                id: res.body.ms[i].id,
                name: res.body.ms[i].t,
                director: res.body.ms[i].dN,
                actor: res.body.ms[i].aN1 + ' / ' + res.body.ms[i].aN2,
                type: res.body.ms[i].movieType,
                commenSpecial: res.body.ms[i].commenSpecial
              }
              this.allMovie.push(Obj)
            }
          }
        })
      } else {
        this.$http.get('/upcoming?locationId=290').then((res) => {
          for (let i = 0; i < res.body.moviecomings.length; i++) {
            const Obj = {
              id: res.body.moviecomings[i].id,
              name: res.body.moviecomings[i].title,
              director: res.body.moviecomings[i].director,
              actor: res.body.moviecomings[i].actor1 + ' / ' + res.body.moviecomings[i].actor2,
              type: res.body.moviecomings[i].type,
              releaseDate: res.body.moviecomings[i].releaseDate
            }
            this.allMovie.push(Obj)
          }
        })
        this.$http.get('/hotPlay?locationId=290').then((res) => {
          for (let i = 0; i < res.body.ms.length; i++) {
            const Obj = {
              id: res.body.ms[i].id,
              name: res.body.ms[i].t,
              director: res.body.ms[i].dN,
              actor: res.body.ms[i].aN1 + ' / ' + res.body.ms[i].aN2,
              type: res.body.ms[i].movieType,
              commenSpecial: res.body.ms[i].commenSpecial
            }
            this.allMovie.push(Obj)
          }
        })
      }
    },
    updated() {
      this.$nextTick(() => {
        if (this.$refs.listWrapper) {
          this.menuWrapper = new IScroll(this.$refs.listWrapper, {
            click: true
          })
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .search-rect {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d8d8d8;
    padding: 9.7px 18px;
    /*width: 339px;*/
    /*height: 42px;*/
    background: #f6f6f6;
    .distress {
      display: flex;
      align-items: center;
      height: 42px;
      line-height: 42px;
      a {
        width: 100%;
        height: 100%;
        span {
          display: block;
          font-size: 20px;
          color: black;
          text-align: center;
          height: 30px;
          font-weight: normal;
          line-height: 30px;
          transform: translateY(5px);
        }
      }
      p {
        margin: 0 10px ;
        width: 15px;
        height: 15px;
        background: url("http://static1.mtime.cn/html5/20170921140022/images/2014/i_city.png") no-repeat;
        background-size: contain;
        padding: 0;
        transform: translateY(5px);
      }
    }
    .search-input {
      display: flex;
      flex:1;
      position: relative;
      align-items: center;
      padding: 0 29px 0 33.8px;
      height: 37px;
      background: #fff url("http://static1.mtime.cn/html5/20170921140022/images/2014/search_ico_01.png") .5em center no-repeat;
      background-size: 21px;
      border: 1px solid #d8d8d8;
      border-radius: 10px;
      input {
        width: 100%;
        font-size: 18px;
        border: none;
        outline: none;
      }
      .search-list {
        position: absolute;
        padding: 0 20px 0 22px;
        width:80%;
        max-height: 400px;
        left: 2px;
        z-index: 51;
        top: 39px;
        background: #f9f9f9;
        border: 1px solid #d9d9d9;
        border-top: none;
        overflow: hidden;
        ul {
          li {
            height: 60px;
            margin: 8px 0;
            border-bottom: 1px solid #D9D9D9;
            &:last-child {
              border: none;
            }
            div {
              height: 100%;
              .item-1 {
                display: flex;
                justify-content: space-between;
                height: 25px;
                line-height: 25px;
                font-size: 18px;
                overflow: hidden;
                div {
                  display: inline-block;
                  width: 60px;
                  font-size: 12px;
                  color: #999999;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }
              .item-2 {
                height: 20px;
                line-height: 20px;
                text-align: right;
                font-size: 12px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                transform: translateY(10px);
              }
              a {
                display: inline-block;
                position: absolute;
                left: 0;
                width:100%;
                height: 60px;
                transform: translateY(-50px);
              }
            }
          }
        }
      }
    }

  }
</style>
