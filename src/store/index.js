import Vue from 'vue'
import Vuex from 'vuex'
import details from './modules/details'
import distress from './modules/distress'
import search from './modules/search'

Vue.use(Vuex)

const state = {
  user: ''
}
const getters = {
  valueUser: state => state.user
}
const mutations = {
  chargeUser(state, user) {
    state.user = user
  },
  logOut(state) {
    state.user = ''
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  modules: {
    details,
    distress,
    search
  }
})
