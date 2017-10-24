const state = {
  searchList: []
}

const getters = {
  searchLists: state => state.searchList
}

const mutations = {
  filterList(state, {val, list}) {
    let newlist = []
    newlist = list.filter(item => {
      return item.name.indexOf(val) !== -1 || item.actor.indexOf(val) !== -1 || item.director.indexOf(val) !== -1
    })
    state.searchList = newlist
    if (val <= 0) {
      state.searchList = []
    }
  },
  clearSearch(state) {
    state.searchList = []
  }
}

const actions = {
  getSearchVal({commit}, {val, list}) {
    commit('filterList', {val, list})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
