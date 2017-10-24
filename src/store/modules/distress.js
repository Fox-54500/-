const state = {
  hotArea: [],
  cityArea: {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    J: [],
    K: [],
    L: [],
    M: [],
    N: [],
    P: [],
    Q: [],
    R: [],
    S: [],
    T: [],
    W: [],
    X: [],
    Y: [],
    Z: []
  },
  list: []
}

const getters = {
  hotAreas: state => state.hotArea,
  cityAreas: state => state.cityArea,
  searchList: state => state.list
}

const mutations = {
  filterPos(state, area) {
    state.hotArea = area.filter((item) => {
      return item.count > 100
    })
    for (let key in state.cityArea) {
      state.cityArea[key] = area.filter((item) => {
        return item.pinyinFull.slice(0, 1) === '' + key
      })
    }
  },
  getList(state, {value, area}) {
    let list = []
    var as = value.replace(value.charAt(0), value.charAt(0).toUpperCase())
    list = area.filter(item => {
      return item.pinyinFull.indexOf(as) !== -1 || item.n.indexOf(as) !== -1
    })
    state.list = list
    if (value <= 0) {
      state.list = []
    }
  },
  emptyList(state) {
    state.list = []
  }
}

const actions = {
  searchByVal({commit}, {value, area}) {
    commit('getList', {value, area})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
