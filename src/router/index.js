//用于创建整个应用的路由器
import VueRouter from "vue-router";
import UserLogin from "@/pages/UserLogin/UserLogin.vue"
import UserRegis from "@/pages/UserRegis/UserRegis.vue"
import MainPage from "@/pages/MainPage/MainPage.vue";
import UserCenter from "@/pages/UserCenter/UserCenter.vue";
import Preface from "@/pages/Preface"
import BookStall from "@/pages/BookStall"
import CategoryDetail from "@/pages/CategoryDetail"
import Search from "@/pages/Search"

export default new VueRouter({
  routes: [
    {
      path: '/regis',
      component: UserRegis
    },
    {
      path: '/login',
      component: UserLogin
    },
    {
      path: '/mainpage',
      component: MainPage
    },
    {
      path: '/usercenter',
      component: UserCenter
    },
    {
      path: '/preface',
      component: Preface
    },
    {
      path:'/bookstall',
      component:BookStall
    },
    {
      path:'/categorydetail/:index',
      component:CategoryDetail
    },
    {
      path:'/search',
      component:Search
    },
    {
      path: '*',
      redirect: '/preface'
    }
  ]
})