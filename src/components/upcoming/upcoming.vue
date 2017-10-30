<template>
  <div class="upcoming">
    <div class="header">
      <div class="header-to" @click="prev"></div>
      <div class="header-all">
        <span class="header-val">正在热映</span>
        <span class="header-state">即将上映</span>
        <router-link :to="{path:'/ongoing',query:{cityN:cityN,locationID:$route.query.locationID||290}}"></router-link>
      </div>

    </div>
    <search :city="$route.query.cityN||'北京'"></search>
    <div class="upcoming-box">
      <div class="pop-movie"></div>
      <div class="upcoming-title">即将上映 <span>({{upcoming.length}}部)</span></div>
      <div class="upcoming-movie">
        <div v-for="(items,index) in month" v-if="items.length">
          <div class="month">{{items.month}}月</div>
          <ul>
            <li v-for="item in items.months">
              <div>
                <div class="day">{{item.rDay}}日</div>
                <div class="movie">
                  <div class="movie-image"><img :src="item.image"></div>
                  <router-link class="movie-id"
                               :to="{path:'/details',query:{locationID:$route.query.locationID ,movieID:item.id}}"></router-link>
                  <div class="movie-content">
                    <div class="title">{{item.title}}</div>
                    <div class="wanted">
                      <div><span>{{item.wantedCount}}</span> 人想看</div>
                      <div>&nbsp;- {{item.type}}</div>
                    </div>
                    <div class="director">导演: {{item.director}}</div>
                    <div class="about">
                      <div class="Ticket" v-if="item.isTicket">
                        <router-link to="">超前预售</router-link>
                      </div>
                      <div class="Video" v-if="item.isVideo">
                        <router-link to="">预告片</router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import search from '../search/search.vue'

  export default {
    name: '',
    data() {
      return {
        hotPlay: {},
        cityN: '',
        upcoming: {},
        idx: 5,
//        popMovie: {},
        month: {
          thisMonth: {},
          nextMonth: {},
          nNextMonth: {}
        }

      }
    },
    created() {
      this.cityN = this.$route.query.cityN
      if (this.$route.query.locationID) {
        this.$http.get('/upcoming?locationId=' + this.$route.query.locationID + '').then((res) => {
          if (res.ok) {
            var time = new Date()
            this.upcoming = res.body.moviecomings
            this.popMovie = this.upcoming.filter((item) => item.wantedCount > 100 && item.rMonth === 10 && item.rDay <= 15)
            this.month.thisMonth = this.upcoming.filter(item => item.rMonth === time.getMonth() + 1)
            this.month.thisMonth = {
              length: this.month.thisMonth.length,
              months: this.month.thisMonth,
              month: time.getMonth() + 1
            }
            this.month.nextMonth = this.upcoming.filter(item => item.rMonth === time.getMonth() + 2)
            this.month.nextMonth = {
              length: this.month.nextMonth.length,
              months: this.month.nextMonth,
              month: time.getMonth() + 2
            }
            this.month.nNextMonth = this.upcoming.filter(item => item.rMonth === time.getMonth() + 3)
            this.month.nNextMonth = {
              length: this.month.nNextMonth.length,
              months: this.month.nNextMonth,
              month: time.getMonth() + 3
            }
          }
        })
      } else {
        this.$http.get('/upcoming?locationId=290').then((res) => {
          this.upcoming = res.body.moviecomings
        })
      }
    },
    methods: {
      prev() {
        window.history.go(-1)
      }
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('scroll', () => {
          this.idx = parseInt(window.scrollY / 140) + 5
        })
      })
    },
    components: {
      search
    }
  }
</script>
<style lang="less" scoped>
  .upcoming {
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
          color: #999999;
          line-height: 100%;
          padding: 9px 35px;
        }
        .header-state {
          padding: 9px 35px;
          line-height: 100%;
          background: #1c2635;
          border-radius: 20px;
          border: 0.04em solid #000000;
        }
        a {
          display: inline-block;
          position: absolute;
          width: 130px;
          height: 35px;
        }
      }
    }
    .upcoming-box {
      margin-left: 15px;
      .pop-movie {

      }
      .upcoming-title {
        margin: 20px 0;
        font-size: 20px;
        font-weight: 600;
        span {
          color: #999999;
        }
      }
      .upcoming-movie {
        div {
          .month {
            padding-bottom: 10px;
            border-bottom: 1px solid #bbbbbb;
          }
          ul {
            margin-top: 15px;
            li {
              margin-top: 15px;
              height: 150px;
              &:last-child .movie {
                border: none;
              }
              div {
                display: flex;
                .day {
                  width: 40px;
                  font-size: 14px;
                  color: #999999;
                }
                .movie {
                  width: 100%;
                  padding-bottom: 10px;
                  border-bottom: 1px solid #e0e0e0;
                  .movie-id {
                    position: absolute;
                    height: 120px;
                    width: 300px;
                  }
                  .movie-image {
                    width: 78px;
                    height: 117px;
                    overflow: hidden;
                    img {
                      height: 117px;
                    }
                  }
                  .movie-content {
                    display: flex;
                    flex-direction: column;
                    margin-left: 20px;
                    .title {
                      font-size: 19px;
                      font-weight: 600;
                      color: #333333;
                      transform: translateY(-5px);
                    }
                    .wanted {
                      margin-top: 5px;
                      font-size: 14px;
                      color: #333333;
                      div:nth-child(1) {
                        span {
                          color: #ff8600;
                        }
                      }
                      div:nth-child(2) {

                      }
                    }
                    .director {
                      margin-top: 10px;
                      font-size: 14px;
                    }
                    .actor {

                    }
                    .about {
                      width: 100%;
                      div {
                        margin: 15px 5px;
                        padding: 10px;
                        width: 70px;
                        border-radius: 20px;

                      }
                      .Ticket {
                        text-align: center;
                        background: #ff8600;
                        a {
                          display: inline-block;
                          margin: 0 auto;
                          font-weight: 400;
                          color: white;
                        }
                      }
                      .Video {
                        text-align: center;
                        color: #659c0d;
                        border: 1px solid #659c0d;
                        a {
                          display: inline-block;
                          margin: 0 auto;
                        }
                      }
                    }
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
