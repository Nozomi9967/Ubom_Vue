<template>
  <div id="app">
    <div class='item left-float' ><router-link  to="/regis">注册</router-link></div>
    <div class='item right-float' ><router-link  to="/login">登录</router-link></div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Regis from './components/Regis';
  import Login from './components/Login';
  export default {
    name:"App",
    components:{Regis,Login},
    methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    } 
  }
  }
</script>

<style scoped>
  .item{
    font-size: 40px;
  }
  .left-float{
    float:left;
  }
  .right-float{
    float:right;
  }
</style>
