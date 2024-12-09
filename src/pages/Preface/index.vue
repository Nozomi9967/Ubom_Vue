<template>
  <div id="main_body">
    <div class="h_center">
      <p>欢迎来到二手书交易平台！</p>
    </div>
    <div class="example">
      <h2>这是哪儿？</h2>
      <p class>这是由我们创新实践小组设计，专门服务为二手书的平台，供用户们自由交易书籍。</p>
      <h2>这里能做什么？</h2>
      <p>在此平台有意愿售出者可以提供书籍的具体信息，由平台进行信息整合，呈现给购买者，实现快速寻找自己目标意愿的书籍。</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'Preface',
  mounted() {
    // 添加全局 Enter 键事件监听器
    console.log('Adding keydown listener');
    document.addEventListener('keydown', this.handleEnterKey);
  },
  beforeDestroy() {
    // 移除全局 Enter 键事件监听器，防止内存泄漏
    console.log('Removing keydown listener');
    document.removeEventListener('keydown', this.handleEnterKey);
  },
  methods:{
    handleEnterKey(event){
      if(event.key=='Enter'){
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped lang="css">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#main_body {
  background: #eff3f5;
  margin-top: 100px;
}

#main_body .example {
  border: 2px solid #a1a1a1;
  padding: 10px 40px;
  background: #dddddd;
  width: 600px;
  border-radius: 25px;
}

.h_center {
  width: 1200px;
  height: 88px;
  margin: 0 auto;
}


.h_center p {
  float: left;
  text-align: center;
  width: 880px;
  font-size: 28px;
  border: 1px solid yellow;
  margin-top: 20px;
  margin-left: 80px;
  color: blue;
  background: pink;
  padding: 3px;
}
</style>