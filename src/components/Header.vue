<template>
  <div class="header">
    <center>
      <span class="title">二手书交易平台</span>
      <ul>
        <li v-show="!isAuthentic"><router-link to="/regis">注册</router-link></li>
        <li v-show="!isAuthentic"><router-link to="/login">登录</router-link></li>
        <li v-show="isAuthentic"><router-link to="/usercenter">个人中心</router-link></li>
      </ul>
    </center>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Header',
  computed: {
    ...mapState(['isAuthentic'])
  }
}
</script>

<style scoped lang="css">
/* .title {
  text-align: center;
  vertical-align: middle;
} */

.header {
  /* 设置宽度高度背景颜色 */
  height: auto;
  /*高度改为自动高度*/
  width: 100%;
  margin-left: 0;
  background: rgb(189, 181, 181);
  position: fixed;
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

.header li router-link {
  /* 设置链接内容显示的格式*/
  display: block;
  /* 把链接显示为块元素可使整个链接区域可点击 */
  color: white;
  text-align: center;
  padding: 3px;
  overflow: hidden;
  text-decoration: none;
  /* 去除下划线 */
}

.header li router-link:hover {
  /* 鼠标选中时背景变为黑色 */
  background-color: #111;
}

.header ul li ul {
  /* 设置二级菜单 */
  margin-left: -0.2px;
  background: rgb(189, 181, 181);
  position: relative;
  display: none;
  /* 默认隐藏二级菜单的内容 */
}

.header ul li ul li {
  /* 二级菜单li内容的显示 */

  float: none;
  text-align: center;
}

.header ul li:hover ul {
  /* 鼠标选中二级菜单内容时 */
  display: block;
}
</style>