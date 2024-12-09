import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './router';
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.prototype.BASE_URL='http://localhost:8080'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
