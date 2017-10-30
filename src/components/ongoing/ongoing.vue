<template>
  <div class="ongoing">
    <div class="header">
      <div class="header-to" @click="prev"></div>
      <div class="header-all">
        <span class="header-val">正在热映</span>
        <span class="header-state">即将上映</span>
        <router-link :to="{path:'/upcoming',query:{cityN:cityN,locationID:$route.query.locationID||290}}"></router-link>
      </div>

    </div>
    <search :city="$route.query.cityN||'北京'"></search>
    <div class="ongoing-box">
      <ul>
        <div class="loading">下拉刷新</div>
        <li class="ongoing-list" v-for="(item,index) in hotPlay.ms" v-if="index< idx">
          <router-link :to="{path:'/details',query: {movieID: item.id, locationID:hotPlay.lid}}">
            <div class="ongoing-rect">
              <div class="ongoing-image">
                <img :src="item.img" alt="">
                <div v-if="item.isHot" class="movie-hot">HOT</div>
              </div>
              <div class="ongoing-content">
                <div class="movie-name">{{item.tCn}}</div>
                <div v-if="item.r!=-1" class="movie-rating">{{item.r}}<span v-if="isInt(item.r)">.0</span></div>
                <div class="movie-commonSpecial" v-if="item.commonSpecial">
                  <span>“</span>
                  <div class="movie-commonSpecial">{{item.commonSpecial}}</div>
                </div>
                <div class="movie-tech">
                  <div v-if="item.is3D">3D</div>
                  <div v-if="item.isDMAX">中国巨幕</div>
                </div>
                <div class="movie-cond"><span>{{item.NearestCinemaCount}}家影院上映 {{item.NearestShowtimeCount}}场</span>
                  <div class="movie-buy">购票</div>
                </div>
              </div>
            </div>
          </router-link>
        </li>
        <div class="loadMore">上拉加载</div>
      </ul>
    </div>
  </div>
</template>

<script>
  import search from '../search/search.vue'
  import IScroll from 'iscroll/build/iscroll-probe'

  export default {
    name: '',
    computed: {},
    data() {
      return {
        hotPlay: {},
        upcoming: {},
        cityN: '',
        refresh: false,
        idx: 5,
        relativeY: 0,
        loadMore: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        let wrapper = document.getElementsByClassName('ongoing-box')[0]
        this.boxWrapper = new IScroll(wrapper, {
          click: true,
          topOffset: 50,
          probeType: 3
        })
      })
    },
    updated() {
      let loading = document.getElementsByClassName('loading')[0]
      let loadMore = document.getElementsByClassName('loadMore')[0]
      this.boxWrapper.on('scroll', () => {
        loading.style.position = 'static'
        loadMore.style.position = 'static'
        if (this.boxWrapper.y >= 50) {
          this.refresh = true
          loading.innerHTML = '正在刷新'
        }
        if (this.boxWrapper.y - this.relativeY < -420) {
          this.loadMore = true
          loadMore.innerHTML = '正在加载'
          this.boxWrapper.refresh()
        }
      })
      this.boxWrapper.on('scrollEnd', () => {
        loading.style.position = 'absolute'
        loadMore.style.position = 'absolute'
        if (this.refresh) {
          this.refresh = false
          this.initData()
          this.idx = 5
          this.relativeY = 0
          loading.innerHTML = '下拉刷新'
        }
        if (this.loadMore) {
          this.initData()
          this.idx += 5
          this.relativeY -= 750
          this.loadMore = false
          loadMore.innerHTML = '上拉加载'
        }
      })
      this.boxWrapper.refresh()
    },
    methods: {
      prev() {
        window.history.go(-1)
      },
      isInt(val) {
        return val % 1 === 0
      },
      initData() {
        if (this.$route.query.locationID) {
          this.$http.get('/hotPlay?locationId=' + this.$route.query.locationID + '')
            .then((res) => {
              if (res.ok) {
                this.hotPlay = res.body
              }
            })
        } else {
          this.$http.get('/hotPlay?locationId=290')
            .then((res) => {
              this.hotPlay = res.body
            })
        }
      }
    },
    components: {
      search
    },
    created() {
      this.initData()
      this.cityN = this.$route.query.cityN
    }
  }
</script>
<style lang="less" scoped>
  .ongoing {
    .header {
      display: flex;
      height: 50px;
      background: #1c2635;
      .header-to {
        width: 50px;
        height: 50px;
        background: url('http://static1.mtime.cn/html5/20170921140022/images/2014/h_btn_back.png') no-repeat center center;
        background-size: 20%;
        /*transform: rotate(90deg);*/
      }
      .header-all {
        display: flex;
        position: relative;
        left: 50%;
        margin: 8px;
        margin-left: -180px;
        font-size: 15px;
        border-radius: 20px;
        color: white;
        background: #0d121a;
        .header-val {
          padding: 9px 35px;
          line-height: 100%;
          background: #1c2635;
          border-radius: 20px;
          border: 0.04em solid #000000;
        }
        .header-state {
          color: #999999;
          line-height: 100%;
          padding: 9px 35px;
        }
        a {
          display: inline-block;
          position: absolute;
          width: 130px;
          height: 35px;
          transform: translateX(130px);
        }
      }
    }
    div.ongoing-box {
      width: 90%;
      height: 500px;
      padding: 0 18px;
      overflow: hidden;
      ul {
        position: relative;
        .loading {
          position: absolute;
          top: -20px;
          width: 100%;
          font-size: 16px;
          text-align: center;
          height: 20px;
        }
        .loadMore {
          position: absolute;
          bottom: -20px;
          width: 100%;
          text-align: center;
          font-size: 16px;
          height: 20px;
        }
        li.ongoing-list {
          width: 100%;
          height: 124px;
          padding: 18px 18px 10px 0;
          border-bottom: 1px solid #d8d8d8;
          &:first-of-type {
            height: 155px;
            a {
              .ongoing-rect {
                .ongoing-content {
                  .movie-cond {
                    .movie-buy {
                      transform: translate3d(20px, 35px, 0);
                    }
                  }
                }
              }
            }
          }
          &:last-of-type {
            border: none;
          }
          a {
            display: inline-block;
            height: 100px;
            .ongoing-rect {
              display: flex;
              .ongoing-image {
                position: relative;
                overflow: hidden;
                img {
                  width: 78px;
                  height: 117.5px;
                }
                .movie-hot {
                  transform: rotate(-45deg);
                  position: absolute;
                  left: -28px;
                  top: 6px;
                  width: 100%;
                  font-size: 10px;
                  font-weight: 100;
                  text-align: center;
                  background: #ff8600;
                  color: white;
                }
              }
              .ongoing-content {
                display: flex;
                margin-left: 20px;
                flex-wrap: wrap;
                height: 121px;
                width: 70%;
                .movie-name {
                  font-size: 18px;
                  max-width: 180px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  font-weight: 600;
                  color: #262626;
                }
                .movie-rating {
                  margin-left: 5px;
                  width: 23px;
                  height: 22px;
                  line-height: 22px;
                  font-size: 13px;
                  text-align: center;
                  background: #659d0e;
                  color: #FFFFFF;
                }
                .movie-commonSpecial {
                  width: 100%;
                  height: 30px;
                  margin-top: 5px;
                  span {
                    display: inline-block;
                    position: absolute;
                    width: 10px;
                    font-size: 30px;
                    color: #659d0e;
                    transform: translate3d(-20px, 0px, 0);
                  }
                  .movie-commonSpecial {
                    margin-left: 10px;
                    width: 90%;
                    color: #659d0e;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                }
                .movie-tech {
                  margin-top: 5px;
                  width: 100%;
                  height: 20px;
                  div {
                    display: inline-block;
                    margin: 0 1px;
                    padding: 2px;
                    font-weight: 200;
                    color: #659d0e;
                    border: 1px solid #659d0e;
                    border-radius: 3px;
                    font-size: 8px;
                  }
                }
                .movie-cond {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  color: #999;
                  width: 230px;
                  height: 50px;
                  line-height: 50px;
                  font-size: 14px;
                  font-weight: 300;
                  span {
                    display: inline-block;
                    width: 100%;
                  }
                  .movie-buy {
                    display: block;
                    padding: 0 17px;
                    text-align: center;
                    background: #ff8600;
                    color: white;
                    width: 80px;
                    height: 34px;
                    font-size: 16px;
                    line-height: 34px;
                    border-radius: 20px;
                    transform: translateX(20px);
                  }
                }
              }

            }
          }
        }
      }
    }
  }
</style>
