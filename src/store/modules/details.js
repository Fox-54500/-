const state = {
  director: {},
  actor: {},
  length: {
    images: 0,
    credits: 0
  },
  type: '',
  onshow: '',
  stillImg1: '',
  stillImg2: '',
  stillImg3: '',
  stillImg4: '',
  comment: {},
  comList: [],
  total: 0,
  comTime: 0
}
const getters = {
  directors: state => state.director,
  actors: state => state.actor,
  lengths: state => state.length,
  types: state => state.type,
  onshows: state => state.onshow,
  stillImg1s: state => state.stillImg1,
  stillImg2s: state => state.stillImg2,
  stillImg3s: state => state.stillImg3,
  stillImg4s: state => state.stillImg4,
  comments: state => state.comment,
  comLists: state => state.comList,
  totals: state => state.total,
  comTimes: state => state.comTime
}

const mutations = {
  getValue(state, {val, still, plus, mini}) {
    if (val) {
      state.director = val.types[0]
      state.actor = val.types[1]
      var list = 0
      val.types.forEach((item, index) => {
        if (index >= 2) {
          return
        }
        list += item.persons.length
      })
      state.length.credits = list
    }
    if (still) {
      state.length.images = still.images.length
      state.stillImg1 = still.images[0].image
      state.stillImg2 = still.images[1].image
      state.stillImg3 = still.images[2].image
      state.stillImg4 = still.images[3].image
    }
    if (plus && mini) {
      state.comment = plus.list[0]
      state.comList = mini.list
      for (let i = 0; i < state.comList.length; i++) {
        let hours = 0
        let minutes = 0
        let days = 0
        state.comList[i].commentDate = Date.parse(new Date()) - state.comList[i].commentDate * 1000
        days = Math.round(state.comList[i].commentDate / 1000 / 60 / 60 / 24)
        hours = Math.round(state.comList[i].commentDate / 1000 / 60 / 60)
        minutes = Math.round(state.comList[i].commentDate % (1000 / 60))
        if (hours >= 24) {
          state.comList[i].commentDate = days + '天前'
        } else if (hours <= 0) {
          state.comList[i].commentDate = minutes + '分钟前'
        } else {
          state.comList[i].commentDate = hours + '小时前'
        }
        if (state.comList[i].rating % 1 === 0 && state.comList[i].rating < 10) {
          state.comList[i].rating = state.comList[i].rating + '.0'
        }
      }
      state.total = mini.total
    }
  }
}
const actions = {
  getVal({commit}, val) {
    commit('getValue', val)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
