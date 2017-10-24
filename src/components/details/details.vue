<template>
  <div class="details">
    <div class="curtain">
      <img :src="movieDetail.img">
    </div>
    <div class="header">
      <div class="header-to" @click="prev"></div>
      <div class="header-all">
        <div class="header-val">
          <router-link to=""></router-link>
        </div>
        <div class="header-state">
          <router-link to=""></router-link>
        </div>

      </div>
    </div>
    <div class="details-rect">
      <div class="detail-image">
        <img :src="movieDetail.img">
        <div class="detail-play"></div>
        <div class="movie-cond">
          <div v-if="movieDetail.is3D">3D</div>
          <div v-if="movieDetail.isIMAX3D">IMAX 3D</div>
          <div v-if="movieDetail.isDMAX">中国巨幕</div>
        </div>
        <router-link :to="{path:'/video', query:{movieID:movieDetail.movieId, name:movieDetail.name}}"></router-link>
      </div>
      <div class="detail-content">
        <div class="movie-name">
          <div>{{movieDetail.name}}</div>
          <div>{{movieDetail.nameEn}}</div>
        </div>
        <div v-if="movieDetail.overallRating>0" class="movie-rating">{{movieDetail.overallRating}}
          <span v-if="isInt(movieDetail.overallRating)">.0</span></div>
        <div class="movie-detail">
          <ul>
            <li v-if="movieDetail.d!=0">{{movieDetail.mins}}</li>
            <li>{{type}}</li>
            <li>{{onshow}}中国上映</li>
          </ul>
        </div>
        <div class="rate-to">
          <router-link to=""><span>我想看</span></router-link>
          <router-link to=""><span>我要评分</span></router-link>
        </div>
      </div>
    </div>
    <div class="movie-commonSpecial">
      <div class="movie-commonSpecial" v-if="movieDetail.commentSpecial">
        <span>“</span>{{movieDetail.commentSpecial}}
      </div>
    </div>
    <div class="checkBuy">
      <router-link to="">查影讯/购票</router-link>
    </div>
    <div class="movie-story">
      <p></p>
      <div class="text">{{movieDetail.story}}</div>
    </div>
    <div @click="zoomHeight" class="zoomHeight"></div>
    <div class="movie-story">
      <p></p>
      <p></p>
    </div>
    <div class="credit">
      <div class="credit-title">{{lengths.credits}}位演职员
        <router-link :to="{path:'/creditList',query:{credit:movieCredit}}"></router-link>
        <div></div>
      </div>
      <div class="credit-content">
        <div class="director" v-for="(item, index) in directors.persons" v-if="index<=0">导演
          <div class="director-image"><img :src="item.image" alt=""></div>
          <div>{{item.name}}</div>
          <div>{{item.nameEn}}</div>
        </div>
        <div class="actor">主要演员
          <ul>
            <li v-for="(item,index) in actors.persons" v-if="index<=1">
              <div class="actor-image"><img :src="item.image"></div>
              <div class="actor-name">
                <div>{{item.name}}</div>
                <div>{{item.nameEn}}</div>
              </div>
              <div class="personate"><img v-if="item.roleCover" :src="item.roleCover" alt="">
                <div>饰:{{item.personate}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="movie-story">
      <p></p>
    </div>
    <div class="movie-still">
      <div class="still-title">{{lengths.images}}张图片
        <router-link :to="{path:'/imgList',query:{still:movieStill,name:movieDetail.name}}"></router-link>
        <div></div>
      </div>
      <div class="still-gallery">
        <div><img :src="stillImg1s"></div>
        <div><img :src="stillImg2s"></div>
        <div><img :src="stillImg3s"></div>
        <div><img :src="stillImg4s"></div>
      </div>
    </div>
    <div class="movie-story">
      <p></p>
    </div>
    <div class="short-comment" v-if="movieComment.total">
      <div class="comment-header">精选影评 ({{movieComment.total}})
        <router-link to=""></router-link>
        <div></div>
      </div>
      <div class="comment-title">{{comments.title}}</div>
      <div class="comment-content">{{comments.content}}</div>
      <div class="comment-person">
        <div class="person-image">
          <img :src="comments.headImg" alt="">
        </div>
        <div class="person-detail">
          <div>{{comments.nickname}}</div>
          <div>{{time}}</div>
        </div>
      </div>
    </div>
    <div class="movie-story">
      <p></p>
    </div>
    <div class="comment-list" v-if="totals">
      <div class="list-title">网友短评 ({{totals}})
        <router-link to=""></router-link>
      </div>
      <div class="list-list">
        <ul v-if="comLists">
          <li v-for="item in comLists">
            <div>
              <div class="person-image"><img :src="item.headImg" alt=""></div>
              <div class="person-content">
                <div class="person-detail">
                  <span>{{item.nickname}}</span>
                  <span>{{item.commentDate}} - 评</span>
                  <span v-if="item.rating>0">{{item.rating}}</span>
                  <span v-else style="background: none"></span>
                </div>
                <div class="detail-content">{{item.content}}</div>
                <div class="operate">
                  <div class="operate-comment">
                    <div></div>
                    回复
                  </div>
                  <div class="operate-flavor">
                    <div></div>
                    赞
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="valueUser" class="user-comment">
      <input placeholder="留下我想说的..." type="text">
      <div @click="comment">发送</div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: '',
    data() {
      return {
        movieDetail: {},
        movieCredit: {},
        movieStill: {},
        movieComment: {},
        show: false,
        type: 0,
        onshow: 0,
        time: 0
      }
    },
    methods: {
      ...mapActions(['getVal']),
      prev() {
        window.history.go(-1)
      },
      isInt(val) {
        return val % 1 === 0
      },
      zoomHeight() {
        let text = document.getElementsByClassName('text')[0]
        let zoom = document.getElementsByClassName('zoomHeight')[0]
        if (this.show) {
          text.style.height = 40 + 'px'
          zoom.style.transform = 'rotate(0deg)'
          this.show = false
        } else {
          text.style.height = '100%'
          zoom.style.transform = 'rotate(180deg)'
          this.show = true
        }
      },
      comment() {
        let commentVal = document.getElementsByClassName('user-comment')[0].childNodes[0]
        if (commentVal.value.length > 5) {
          const userComment = {
            nickname: this.valueUser,
            commentDate: '1分钟前',
            content: commentVal.value,
            headImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507263021887&di=9c6fbac640426729f4a33a5375229390&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fbbs4%2F20096%2F14%2F1244924685911.jpg'
          }
          this.commentList.list.unshift(userComment)
          this.getVal({mini: this.commentList})
          commentVal.value = ''
        } else {
          alert('请输入超过5个字符以上的评论')
        }
      }
    },
    computed: {
      ...mapGetters(['directors', 'actors', 'lengths', 'types', 'onshows',
        'stillImg1s', 'stillImg2s', 'stillImg3s', 'stillImg4s', 'comments',
        'comLists', 'totals', 'valueUser']),
      movie: () => this.movieDetail,
      isShow: () => this.show,
      credit: () => this.movieCredit
    },
    beforeCreate() {
      window.scrollTo(0, 0)
      this.$http.get('/list?locationId=' + this.$route.query.locationID +
        '&movieId=' + this.$route.query.movieID + '')
        .then((res) => {
          this.movieDetail = res.body.data.basic
        })
      this.$http.get('/credit?movieId=' + this.$route.query.movieID + '')
        .then((res) => {
          this.movieCredit = JSON.parse(res.body)
          this.getVal({val: this.movieCredit})
        })
      this.$http.get('/image?movieId=' + this.$route.query.movieID + '')
        .then((res) => {
          this.movieStill = JSON.parse(res.body)
          this.getVal({still: this.movieStill})
        })
      this.$http.get('/comment?movieId=' + this.$route.query.movieID + '')
        .then((res) => {
          this.movieComment = res.body.data.plus
          this.commentList = res.body.data.mini
          this.getVal({plus: this.movieComment, mini: this.commentList})
          this.time = new Date(this.comments.commentDate * 1000)
          this.time = this.time.toLocaleDateString().replace(/\//g, '-') +
            ' ' + this.time.toTimeString().substr(0, 8)
        })
    },
    watch: {
      movieDetail(val) {
        let list = val.type.splice(0, 3).join('/')
        this.type = list
        let rd = val.releaseDate.split('')
        rd.splice(3, 1, rd[3], '年')
        rd.splice(6, 1, rd[6], '月')
        rd.splice(9, 1, rd[9], '日')
        let newstr = rd.join('')
        this.onshow = newstr
      }
    }
  }
</script>
<style lang="less" scoped>
  .details {
    .curtain {
      position: absolute;
      z-index: -1;
      top: -20px;
      background-repeat: no-repeat;
      background-size: 150%;
      width: 100%;
      height: 200px;
      overflow: hidden;
      filter: blur(10px);
      img {
        width: 100%;
      }
    }
    .header {
      display: flex;
      justify-content: space-between;
      height: 50px;
      .header-to {
        width: 50px;
        height: 50px;
        background: url('http://static1.mtime.cn/html5/20170921140022/images/2014/h_btn_back.png') no-repeat center center;
        background-size: 20%;
        /*transform: rotate(90deg);*/
      }
      .header-all {
        display: flex;
        font-size: 15px;
        color: white;
        .header-val {
          width: 50px;
          background: url('http://static1.mtime.cn/html5/20170921140022/images/2014/i_h_collection.png') no-repeat center center;
          background-size: 60%;
          a {
            display: inline-block;
            width: 50px;
            height: 50px;
          }
        }
        .header-state {
          width: 50px;
          background: url('http://static1.mtime.cn/html5/20170921140022/images/2014/i_h_share.png') no-repeat center center;
          background-size: 60%;
          a {
            display: inline-block;
            width: 50px;
            height: 50px;
          }
        }
      }
    }
    div.details-rect {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      padding: 0 15px;
      .detail-image {
        position: relative;
        padding: 0;
        width: 126px;
        height: 189.5px;
        img {
          width: 126px;
          height: 189.5px;

        }
        .detail-play {
          position: absolute;
          top: 35%;
          left: 30%;
          width: 50px;
          z-index: 2;
          height: 50px;
          background: url('http://static1.mtime.cn/html5/20170921140022/images/2014/viceoplay.png') no-repeat center center;
          background-size: contain;
          border-radius: 50%;
          /*border: 1px solid #FFFFFF;*/
        }
        .movie-cond {
          position: absolute;
          z-index: 3;
          top: 0;
          right: 5px;
          div {
            width: 30px;
            text-align: center;
            margin-top: 5px;
            padding: 5px 2px;
            font-size: 0.5em;
            background: rgba(7, 17, 27, 0.3);
            color: #FFFFFF;
            border: 1px solid white;
            border-radius: 5px;
          }
        }
        a {
          display: inline-block;
          position: absolute;
          z-index: 50;
          left: 0;
          top: 0;
          width: 130px;
          height: 195px;
        }
      }
      .detail-content {
        position: relative;

        .movie-name {
          div {
            width: 196.2px;
            height: 22px;
            color: white;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 22px;
            &:last-child {
              height: 17px;
              font-size: 15px;
            }
          }
        }
        .movie-rating {
          position: absolute;
          right: 10px;
          top: 50px;
          color: white;
          padding: 8px 5px;
          background: #659d0e;
        }
        .movie-detail {
          margin-top: 30px;
          width: 100%;
          ul {
            font-size: 15px;
            font-weight: 600;
            li {
              margin: 10px 0;
            }
          }
        }
        .rate-to {
          a {
            display: inline-block;
            width: 47%;
            padding: 15px 0;
            text-align: center;
            border-radius: 25px;
            border: 1px solid #999999;
            span {

            }
            &:last-child {
              color: #659d0e;
              border: 1px solid #659d0e;
            }
          }
        }
      }
    }
    .movie-commonSpecial {
      width: 100%;
      height: 30px;
      .movie-commonSpecial {
        color: #fd8900;
        text-align: center;
        font-size: 17px;
        span {
          display: inline-block;
          width: 10px;
          font-size: 30px;
          transform: translate3d(-20px, 10px, 0);
        }
      }
    }
    .checkBuy {
      text-align: center;
      margin: 15px auto;
      width: 90%;
      height: 45px;
      line-height: 45px;
      background: #fd8900;
      border-radius: 25px;
      font-size: 18px;
      font-weight: 600;
      a {
        color: white;

      }
    }
    .movie-story {
      overflow: hidden;
      p {
        margin-bottom: 5px;
        width: 100%;
        height: 15px;
        background: #f6f6f6;
      }
      div {
        padding: 15px 0;
        height: 40px;
        margin: 0 auto;
        width: 339px;
        letter-spacing: 0.9px;
        line-height: 25px;
      }
    }
    .zoomHeight {
      width: 100%;
      height: 30px;
      background: #fff url('http://static1.mtime.cn/html5/20170921140022/images/2014/i-tmore.png') no-repeat center center;
      background-size: 5%;
    }
    .credit {
      width: 90%;
      padding: 0 15px;
      .credit-title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 32px;
        line-height: 32px;
        font-size: 20px;
        font-weight: 600;
        a {
          position: absolute;
          transform: translateY(-30px);
          height: 30px;
          width: 90%;
        }
        div {
          width: 20px;
          height: 20px;
          background: #fff url('http://static1.mtime.cn/html5/20170921140022/images/2014/i-tmore.png') no-repeat center center;
          background-size: 90%;
          transform: translateY(8px) rotate(-90deg);
        }
      }
      .credit-content {
        display: flex;
        padding-bottom: 20px;
        justify-content: space-between;
        .director {
          border-right: 1px solid #D9D9D9;

          padding-right: 10px;
          margin-top: 30px;
          .director-image {
            margin-top: 5px;
            img {
              width: 102.5px;
              height: 146px;
            }
          }
          div {
            margin-top: 10px;
            font-size: 14px;
          }
        }
        .actor {
          padding: 0 10px;
          width: 100%;
          margin-top: 30px;
          ul {
            display: flex;
            width: 100%;
            li {
              margin-right: 10px;
              .actor-image {
                margin-top: 5px;
                height: 102px;
                overflow: hidden;
                img {
                  width: 102px;
                  height: 146px;
                }
              }
              .actor-name {
                padding: 10px 0;
                height: 30px;
                text-align: center;
                font-size: 12px;
              }
              .personate {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                font-size: 14px;
                img {
                  width: 48px;
                  height: 48px;
                  border-radius: 50%;
                }
                div {
                  margin-top: 10px;
                }
              }
            }
          }
        }
      }
    }
    .movie-still {
      width: 90%;
      padding: 0 18px;
      margin-bottom: 20px;
      .still-title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 32px;
        line-height: 32px;
        font-size: 20px;
        font-weight: 600;
        a {
          position: absolute;
          transform: translateY(-30px);
          height: 50px;
          width: 90%;
        }
        div {
          width: 20px;
          height: 20px;
          background: #fff url('http://static1.mtime.cn/html5/20170921140022/images/2014/i-tmore.png') no-repeat center center;
          background-size: 90%;
          transform: translateY(8px) rotate(-90deg);
        }
      }
      .still-gallery {
        display: flex;
        justify-content: space-around;
        div {
          margin-top: 20px;
          overflow: hidden;
          width: 79px;
          height: 79px;
          img {
            transform: translate3d(-10px, -10px, 0);
            height: 130px;
          }
        }

      }
    }
    .short-comment {
      width: 90%;
      padding: 0 18px;
      margin-bottom: 20px;
      color: #333333;
      .comment-header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 32px;
        line-height: 32px;
        font-size: 20px;
        font-weight: 600;
        a {
          position: absolute;
          transform: translateY(-30px);
          height: 50px;
          width: 90%;
        }
        div {
          width: 20px;
          height: 20px;
          background: #fff url('http://static1.mtime.cn/html5/20170921140022/images/2014/i-tmore.png') no-repeat center center;
          background-size: 90%;
          transform: translateY(8px) rotate(-90deg);
        }
      }
      .comment-title {
        margin: 14px 0;
        width: 100%;
        height: 32px;
        line-height: 32px;
        font-size: 20px;
        font-weight: 600;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .comment-content {
        margin-bottom: 15px;
        letter-spacing: 3px;
        width: 100%;
        height: 65px;
        line-height: 22px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .comment-person {
        display: flex;
        align-items: center;
        .person-image {
          img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
          }
        }
        .person-detail {
          margin-left: 10px;
          font-size: 15px;
          div {
            margin: 10px 0;
          }
        }
      }
    }
    .comment-list {
      width: 90%;
      padding: 0 18px;
      margin-bottom: 20px;
      color: #333333;
      .list-title {
        margin-bottom: 15px;
        width: 100%;
        height: 32px;
        line-height: 32px;
        font-size: 20px;
        font-weight: 600;
        a {
          position: absolute;
          transform: translate3d(-160px, -5px, 0);
          height: 50px;
          width: 90%;
        }
      }
      .list-list {
        ul {
          li {
            margin-bottom: 30px;
            padding: 0 18px 18px 0;
            /*height: 130px;*/
            width: 100%;
            border-bottom: 1px solid #D9D9D9;
            div {
              display: flex;
              justify-content: flex-start;
              font-size: 13px;
              .person-image {
                img {
                  width: 48px;
                  height: 48px;
                  border-radius: 50%;
                }
              }
              div.person-content {
                flex-wrap: wrap;
                margin-left: 15px;
                .person-detail {
                  width: 100%;
                  height: 20px;
                  color: #999999;
                  span:nth-child(1) {
                    display: inline-block;
                    margin-right: 5px;
                    width: 170px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  }
                  span:nth-child(2) {
                    width: 85px;
                  }
                  span:nth-child(3) {
                    display: inline-block;
                    color: white;
                    width: 25px;
                    font-size: 12px;
                    text-align: center;
                    line-height: 150%;
                    transform: translateY(-2px);
                    background: #659d0e;
                  }
                }
                .detail-content {
                  position: relative;
                  margin-top: 12px;
                  width: 280px;
                  word-break: break-all;
                  overflow: hidden;
                  font-size: 16px;
                  line-height: 25px;
                  letter-spacing: 2px;
                }
                .operate {
                  display: flex;
                  justify-content: flex-end;
                  width: 100%;
                  margin-top: 20px;
                  .operate-comment {
                    div {
                      float: left;
                      margin: 0 10px;
                      padding: 3px;
                      width: 15px;
                      height: 15px;
                      background: url('http://static1.mtime.cn/html5/20170921140022/images/2014/ico_reply.png');
                      background-size: 100%;
                    }
                  }
                  .operate-flavor {
                    margin-right: 10px;
                    div {
                      float: left;
                      margin: 0 10px;
                      padding: 3px;
                      width: 15px;
                      height: 15px;
                      background: url('http://static1.mtime.cn/html5/20170921140022/images/2014/ico_praise.png');
                      background-size: 100%
                    }
                  }
                }
              }

            }
          }
        }
      }
    }
    .user-comment {
      display: flex;
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 53px;
      background: white;
      border-top: 1px solid #b4b4b4;
      input {
        margin: 5px 15px;
        width: 280px;
        outline: none;
        border: 1px solid #777777;
        border-radius: 3px;
        text-indent: 5px;
        font-size: 17px;
      }
      div {
        flex: 1;
        line-height: 50px;
        text-align: center;
        color: #777777;
      }
    }
  }
</style>
