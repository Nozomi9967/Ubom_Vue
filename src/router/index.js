//用于创建整个应用的路由器
import VueRouter from "vue-router";
import Login from "../components/Login.vue"
import Regis from "../components/Regis.vue"
import MainPage from "../components/MainPage.vue";

export default new VueRouter({
  routes: [
    {
      path: '/regis',
      component: Regis
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/mainpage',
      component: MainPage
    }
  ]
})