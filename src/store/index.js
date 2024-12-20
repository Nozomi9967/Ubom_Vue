import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {

}

const mutations = {
  RevBuyState(state){
    state.isbuy=true
  },
  InsertShopCart(state,item){
    state.shopCart.push(item)
  },
  RenewShopCart(state,array){
    state.shopCart=array
  },
  RenewBalance(state,newbalance){
    state.balance=newbalance
  },
  LoadBaseInfo(state) {
    state.token = localStorage.getItem('token')
    state.username = localStorage.getItem('userName')
    state.userId = localStorage.getItem('userId')
    state.avatar=localStorage.getItem('avatar')
    state.balance=localStorage.getItem('balance')
  },
  AUTH(state) {
    state.isAuthentic = true
  },
  UNDO_AUTH(state){
    state.isAuthentic=false
  }

}

const state = {
  isAuthentic: false,
  userId: localStorage.getItem('userId') || '',
  username: localStorage.getItem('userName') || '',
  token: localStorage.getItem('token') || '',
  avatar:localStorage.getItem('avatar')||'',
  balance:localStorage.getItem('balance')||'',
  shopCart:[],
  isbuy:false
}
export default new Vuex.Store({
  actions,
  mutations,
  state
})