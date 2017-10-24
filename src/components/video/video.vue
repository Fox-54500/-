<template>
  <div class="video">
    <div class="header">
      <div class="header-to" @click="prev"></div>
      <div class="header-all">{{$route.query.name}} - 预告片&拍摄花絮</div>
    </div>
    <div class="video-list">
      <ul>
        <li v-for="item in video" @click="playVideo(item, $event)">
          <div>
            <div class="video-image">
              <img :src="item.image" alt="">
              <div class="detail-play"></div>
            </div>
            <div class="video-title">{{item.title}}</div>
            <div class="video-length">片长 : {{parseInt(item.length / 60)}}分{{item.length % 60}}秒</div>
            <div class="video-play" v-if="item.show">
              <video controls autoplay @ended="closeVideo(item, $event)">
                <source :src="item.url" type="video/mp4">
              </video>
              <div @click="closeVideo(item, $event)">&times;</div>
            </div>
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
        video: {}
      }
    },
    created() {
      this.$http.get('/trailer?pageIndex=1&movieId=' + this.$route.query.movieID)
        .then((res) => {
          this.video = JSON.parse(res.body).videoList
          for (let i = 0; i < this.video.length; i++) {
            this.video[i] = {...this.video[i], show: false}
          }
        })
    },
    methods: {
      playVideo(show, e) {
        show.show = true
        this.video.push(1)
        this.video.pop()
        e.stopPropagation()
      },
      closeVideo(show, e) {
        show.show = false
        this.video.push(1)
        this.video.pop()
        e.stopPropagation()
      },
      prev() {
        window.history.go(-1)
      }
    }
  }
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    height: 60px;
    background: #1c2635;
    .header-to {
      position: absolute;
      width: 60px;
      height: 60px;
      background: url('http://static1.mtime.cn/html5/20170921140022/images/2014/h_btn_back.png') no-repeat center center;
      background-size: 20%;
      /*transform: rotate(90deg);*/
    }
    .header-all {
      margin: 0 auto;
      line-height: 60px;
      font-size: 20px;
      color: white;
    }
  }

  .video-list {
    padding-left: 25px;
    ul {
      li {
        height: 96px;
        padding: 18px 0;
        border-bottom: 1px solid #d9d9d9;
        div {
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          flex-direction: column;
          height: 100%;
          div.video-image {
            position: relative;
            width: 150px;
            img {
              width: 150px;
            }
            .detail-play {
              position: absolute;
              bottom: 18px;
              right: 7px;
              width: 36px;
              z-index: 2;
              height: 36px;
              background: url('http://static1.mtime.cn/html5/20170921140022/images/2014/viceoplay.png') no-repeat center center;
              background-size: contain;
              border-radius: 50%;
              /*border: 1px solid #FFFFFF;*/
            }
          }
          div.video-title {
            margin-left: 20px;
            width: 175px;
            height: 60px;
            font-size: 18px;
            font-weight: 600;
            line-height: 27px;
          }
          div.video-length {
            margin-left: 20px;
            height: 20px;
            color: #999999;
          }
          div.video-play {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 51;
            background: rgba(7, 17, 27, 0.8);
            width: 100%;
            video {
              position: absolute;
              width: 375px;
              margin-left: -187.5px;
              margin-top: -105px;
              z-index: 52;
              left: 50%;
              top: 50%;
            }
            div {
              position: absolute;
              bottom: 30px;
              left: 160px;
              width: 50px;
              height: 50px;
              background: rgba(7, 17, 27, 0.9);
              color: white;
              font-size: 40px;
              line-height: 45px;
              border-radius: 50%;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
