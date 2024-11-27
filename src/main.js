import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './router';
import store from './store'
import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Container, Aside, Main } from 'element-ui';
Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.component(Container.name, Container)
Vue.component(Aside.name, Aside)
Vue.component(Main.name, Main)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
