import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {

}

const mutations = {
  LoadBaseInfo(state) {
    state.token = localStorage.getItem('token')
    state.username = localStorage.getItem('userName')
    state.userId = localStorage.getItem('userId')
  },
  AUTH(state) {
    state.isAuthentic = true
  }
}

const state = {
  isAuthentic: false,
  userId: localStorage.getItem('userId') || '',
  username: localStorage.getItem('userName') || '',
  token: localStorage.getItem('token') || '',
}
export default new Vuex.Store({
  actions,
  mutations,
  state
})