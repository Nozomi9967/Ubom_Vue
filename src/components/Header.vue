<template>
  <div class="header">
    <center style="width: 186vh;">
      <span class="title">二手书交易平台</span>
      <ul>
        <li v-show="!isAuthentic"><router-link to="/regis">注册</router-link></li>
        <li v-show="!isAuthentic"><router-link to="/login">登录</router-link></li>
        <li v-show="isAuthentic"><router-link to="/usercenter">个人中心</router-link></li>
      </ul>
    </center>
    <el-menu style="margin-top: 20px;display: flex; justify-content: flex-start;margin-left: 250px;margin-right: 250px;" v-show="isAuthentic" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">书摊</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Header',
  computed: {
    ...mapState(['isAuthentic'])
  },
  methods:{
    handleSelect(index,indexPath){
      console.log(index,indexPath)
      switch(index){
        case '1':
          console.log('首页')
          this.$router.push('/mainpage')
          break
        case '2':
          console.log('书摊')
          this.$router.push('/bookstall')
          break

      }

    },
  }
}
</script>

<style scoped lang="css">


.title {
  /* text-align: center;
  vertical-align: middle; */
  font-weight: bold;
  font-size: 24px;
}

.header center {
  /* 设置宽度高度背景颜色 */
  height: auto;
  /*高度改为自动高度*/
  width: 100%;
  margin-left: 0;
  background: rgb(189, 181, 181);
  /* position: fixed; */
  /*固定在顶部*/
  top: 0;
  /*离顶部的距离为0*/
  margin-bottom: 5px;
}

.header ul {
  /* 清除ul标签的默认样式 */
  width: auto;
  /*宽度也改为自动*/
  list-style-type: none;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 5%;
  /* margin-header: 0;          */
  padding: 0;
}

.header li {
  /* 使li内容横向浮动，即横向排列  */
  margin-right: 2%;
  /* 两个li之间的距离*/
  position: relative;
  overflow: hidden;
  float: right;
}


</style>