<template>
  <div class="home-page">
    <loading v-if="!hotPlay.ms"></loading>
    <topper></topper>
    <search :city="$route.query.cityN || '北京'" :locationID="$route.query.locationID||290"></search>
    <div class="hotMovie">
      <router-link class="title"
                   :to="{path:'/ongoing',query:{cityN:$route.query.cityN, locationID:$route.query.locationID||290}}">
        <span>正在热映 ( {{length}}部 )</span>
        <span></span>
      </router-link>
      <div class="hotPlay-wrapper">
        <ul :style="{width:length*84+'px'}">
          <li v-for="(item, index) in hotPlay.ms" v-if="index<ongIndex">
            <div class="hotMovie-image">
              <div v-if="item.r!=-1" class="rating">{{item.r}}<span v-if="isInt(item.r)">.0</span></div>
              <img :src="item.img">
              <router-link class="title"
                           :to="{path:'/details',query: {movieID: item.id, locationID:hotPlay.lid, detail:item}}">
              </router-link>
            </div>
            <div>
              {{item.tCn}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="upcoming">
      <router-link class="title"
                   :to="{path:'/upcoming',query:{cityN:$route.query.cityN,locationID:$route.query.locationID||290}}">
        <span>即将上映 ( {{upcoming.length}}部 )</span>
        <span></span>
      </router-link>
      <div class="upcoming-wrapper">
        <ul :style="{width:upcoming.length*84+'px'}">
          <li v-for="(item, index) in upcoming" v-if="index<upcIndex">
            <div class="hotMovie-image">
              <img :src="item.image">
              <router-link class="title"
                           :to="{path:'/details',query: {movieID: item.id, locationID:$route.query.locationID||290, detail:item}}">
              </router-link>
            </div>
            <div>
              {{item.title}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="cin-line">
      <p></p>
    </div>
  </div>
</template>

<script>
  import search from '../search/search.vue'
  import topper from '../header/header.vue'
  import IScroll from 'iscroll/build/iscroll-probe'
  import Loading from '../loading/Loading.vue'

  export default {
    name: '',
    data() {
      return {
        upcoming: {},
        length: {},
        hotPlay: {},
        ongIndex: 5,
        upcIndex: 5
      }
    },
    computed: {},
    beforeCreate() {
      setTimeout(() => {
        if (this.$route.query.locationID) {
          this.$http.get('/upcoming?locationId=' + this.$route.query.locationID + '').then((res) => {
            if (res.ok) {
              this.upcoming = res.body.moviecomings
            }
          })
          this.$http.get('/hotPlay?locationId=' + this.$route.query.locationID + '').then((res) => {
            if (res.ok) {
              this.hotPlay = res.body
            }
          })
        } else {
          this.$http.get('/upcoming?locationId=290').then((res) => {
            this.upcoming = res.body.moviecomings
          })
          this.$http.get('/hotPlay?locationId=290').then((res) => {
            this.hotPlay = res.body
          })
        }
      }, 1000)
    },
    mounted() {
      this.$nextTick(() => {
        let upcoming = document.getElementsByClassName('upcoming-wrapper')[0]
        let hotplay = document.getElementsByClassName('hotPlay-wrapper')[0]
        this.upcomingWrapper = new IScroll(upcoming, {
          click: true,
          scrollX: true,
          scrollY: false,
          probeType: 3
        })
        this.hotplayWrapper = new IScroll(hotplay, {
          click: true,
          scrollX: true,
          scrollY: false,
          probeType: 3
        })
      })
    },
    updated() {
      this.upcomingWrapper.on('scroll', () => {
        this.upcIndex = -parseInt(this.upcomingWrapper.x / 84) + 5
      })
      this.hotplayWrapper.on('scroll', () => {
        this.ongIndex = -parseInt(this.hotplayWrapper.x / 84) + 5
      })
      this.upcomingWrapper.refresh()
      this.hotplayWrapper.refresh()
    },
    methods: {
      isInt(val) {
        return val % 1 === 0
      }
    },
    components: {
      search,
      topper,
      Loading
    },
    watch: {
      hotPlay(val) {
        this.length = val.ms.length
      }
    }
  }
</script>
<style lang="less" scoped>
  .home-page {
    .hotMovie {
      margin: 0 auto;
      padding: 6px 18px 18px 18px;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        width: 100%;
        height: 42px;
        color: #333;
        font-size: 21px;
        font-weight: bold;
        span:last-child {
          display: inline-block;
          width: 20px;
          height: 10px;
          background: url("http://static1.mtime.cn/html5/20170921140022/images/2014/i_city.png") no-repeat;
          background-size: contain;
          transform: rotate(-90deg);
        }
      }
      .hotPlay-wrapper {
        overflow: hidden;
        ul {
          display: flex;
          li {
            display: flex;
            flex-direction: column;
            div {
              width: 84px;
              text-align: center;
              margin-bottom: 10px;
              &.hotMovie-image {
                position: relative;
                img {
                  width: 78px;
                  height: 116px;
                }
                .rating {
                  position: absolute;
                  top: 3px;
                  right: 5px;
                  width: 23px;
                  height: 22px;
                  line-height: 22px;
                  font-size: 13px;
                  background: #659d0e;
                  color: #FFFFFF;
                }
                a {
                  display: block;
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  top: 0;
                  left: 0;
                }
              }

              &:last-child {
                overflow: hidden;
                height: 32px;
                font-weight: 200;
              }
            }
          }
        }
      }

    }
    .upcoming {
      margin: 0 auto;
      padding: 6px 18px 18px 18px;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #d8d8d8;
        margin-bottom: 20px;
        width: 100%;
        height: 42px;
        color: #333;
        font-size: 21px;
        font-weight: bold;
        span:last-child {
          display: inline-block;
          width: 20px;
          height: 10px;
          background: url("http://static1.mtime.cn/html5/20170921140022/images/2014/i_city.png") no-repeat;
          background-size: contain;
          transform: rotate(-90deg);
        }

      }
      .upcoming-wrapper {
        overflow: hidden;
        ul {
          display: flex;
          li {
            display: flex;
            flex-direction: column;
            div {
              width: 84px;
              text-align: center;
              margin-bottom: 10px;
              &.hotMovie-image {
                position: relative;
                img {
                  width: 78px;
                  height: 116px;
                }
                .rating {
                  position: absolute;
                  top: 3px;
                  right: 5px;
                  width: 23px;
                  height: 22px;
                  line-height: 22px;
                  font-size: 13px;
                  background: #659d0e;
                  color: #FFFFFF;
                }
                a {
                  display: block;
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  top: 0;
                  left: 0;
                }
              }

              &:last-child {
                overflow: hidden;
                height: 32px;
                font-weight: 200;
              }
            }
          }
        }
      }
    }
  }
</style>
