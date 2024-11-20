import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import router from './router';
Vue.config.productionTip = false

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
