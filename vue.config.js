module.exports = {
  devServer: {
    proxy: 'http://localhost:8081'
    //注意这里的端口号写你想访问数据的那个服务器端口号
  },
  //关闭eslint
  lintOnSave: false

};
