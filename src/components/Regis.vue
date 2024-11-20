<template>
  <!-- <div style="text-align: center;" class="S30">
    <span style="margin-bottom: 100px;">注册界面</span><br><br>
    账号<input class="space" v-model="User.username" placeholder="请输入内容"><br>
    密码<input class="space" placeholder="请输入密码" v-model="User.password" show-password><br>
    <button class="BtnSize" @click="submitInfo">注册</button>
  </div> -->
  <div>
    <div id="reg_header">
      <div class="reg_h_center">
        <div class="reg_h_left">
          <h3>欢迎注册</h3>
        </div>
      </div>
    </div>


<!--表单内容-->
    <div class="reg_back">
        <div class="reg_left">
            <p>新用户注册</p>
            <p>USER REGISTER</p>
        </div>
        <div class="reg_center">
            <div class="reg_form">
                <form>
                    <table>
                        <tr>
                            <td class="td_left"><label for="username">用户名</label></td>
                            <td class="td_right">
                            <input id="username" 
                            class="space" 
                            v-model="User.username" 
                            placeholder="请输入内容"
                            @blur="handleUserNameBlur"
                            @focus="handleUserNameFocus">
                            <p v-if="showUserNameErrorMsg">用户名长度不得小于5</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="td_left"><label for="password">密码</label></td>
                            <td class="td_right">
                            <input 
                            id="password" 
                            class="space" 
                            placeholder="请输入密码" 
                            v-model="User.password" 
                            show-password
                            @blur="handlePswBlur"
                            @focus="handlePswFocus">
                            <p v-if="showPswErrorMsg">密码长度需要在6-12区间内</p>
                            </td>
                        </tr>
                        <tr>
                            <td class="td_left"><label for="Email">Email</label></td>
                            <td class="td_right"><input type="email" name="email" placeholder="请输入Email" v-model="User.email" id="Email">
                            </td>
                        </tr>

                        <tr>
                            <td colspan="2" align="center"><button id="btn_sub" class="BtnSize" @click="submitInfo">注册</button></td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
        <div class="reg_right">
            <p>已有账号?<router-link to="/login">立即登录</router-link></p>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name:'Regis',
  data() {
    return {
      User:{
        username: '',
        password:'',
        email:''
      },
      showUserNameErrorMsg:false,
      showPswErrorMsg:false
    }
    
  },
  methods: {
        async submitInfo(){
            const response=await axios.post('http://localhost:8080/register',this.User);
            if(response.data.code==200){
                console.log('注册成功',response.data);
                this.$router.push('/login');
            }else{
                console.log('注册失败',response.data);
                alert('注册失败 '+response.data.message);
            }

        },
        handleUserNameErrorMsg(){
            if(this.User.username.length<5)
                this.showUserNameErrorMsg=true; 
            else
                this.showUserNameErrorMsg=false;
            
        },
        handlePswErrorMsg(){
            if(this.User.password.length<6 || this.User.password.length>12)
                this.showPswErrorMsg=true
            else
                this.showPswErrorMsg=false
        },
        handleUserNameBlur(){
            this.showUserNameErrorMsg=false
        },
        handleUserNameFocus(){
            this.handleUserNameErrorMsg()
        },
        handlePswBlur(){
            this.showPswErrorMsg=false
        },
        handlePswFocus(){
            this.handlePswErrorMsg()
        }

    },
    watch:{
        'User.username':{
            handler:'handleUserNameErrorMsg'
        },
        'User.password':{
            handler:'handlePswErrorMsg'
        }
    }
}
</script>

<style>
#footer {
  text-align: center;
  height: 300px;
  padding-top: 30px;
}

#footer .copyright {
  margin-top: 20px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
}

#header {
    height: 210px;
    background: white;
}

#header .header_top {
height: 36px;
background: #f5f5f5;
}

#header .header_top_center {
width: 1200px;
height: 36px;
margin: 0 auto;
line-height: 36px;
}

#header .header_top_center .h_top_left {
color: gray;
font-size: 13px;
float: left;
height: 36px;
}

#header .header_top_center .h_top_right {
color: gray;
font-size: 13px;
float: right;
height: 36px;
}

#header .header_top_center.h_top_right a {
color: #6c6c6c;
margin: 0 5px;
font-size: 13px;
}

#header .header_center {
height: 124px;
width: 1200px;
margin: 0 auto;
}

#header .header_center .h_c_logo {
width: 190px;
height: 124px;
float: left;
}

#header .header_center .h_c_search {
width: 815px;
height: 124px;
float: left;
}

#header .header_center .h_c_code {
width: 190px;
height: 124px;
float: left;
}

#header .h_c_logo img {
width: 200px;
height: 120px;
margin-top: 4px;
}

#header .h_c_search form {
width: 650px;
height: 40px;
margin-top: 40px;
margin-left: 50px;
}

#header .h_c_search form .t_input {
width: 555px;
height: 40px;
border: 2px solid black;
padding-left: 10px;
}

#header .h_c_search form .t_button {
width: 75px;
height: 40px;
border: 1px solid gray;
float: right;
color: orange;
margin-left: 5px;
}

#header .h_c_search .hot {
margin-left: 80px;
margin-top: 5px;
}

#header .h_c_search .hot a {
color: #6c6c6c;
font-size: 15px;
}

#header .h_c_search .hot a:hover {
color: orangered;
}

#header .h_c_code img {
margin-top: 10px;
margin-left: 20px;
width: 140px;
height: 110px;
}

#header .nav {
width: 1200px;
height: 44px;
margin: 0 auto;
background: darkslategrey;
line-height: 44px;
border-radius: 8px 8px 8px 8px;
}

#header .nav ul {
list-style: none;
width: 1200px;
height: 44px;
display: flex;
}

#header .nav ul li {
flex: 1;
text-align: center;
}

#header .nav ul li a {
color: white;
font-size: 16px;
font-weight: bold;
}

#header .nav ul li a:hover {
font-size: 25px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#reg_header {
    height: 110px;
    width: 100%;
    box-shadow: 0px 0px 10px orange;
}

    #reg_header .reg_h_center {
        width: 1200px;
        height: 110px;
        margin: 0 auto;
        display: flex;
    }

    #reg_header .reg_h_left {
        height: 110px;
        flex: 1;
    }

        #reg_header .reg_h_left img {
            height: 100px;
            width: 120px;
            float: left;
        }

        #reg_header .reg_h_left h3 {
            float: left;
            margin-top: 80px;
            margin-left: 10px;
        }

    #reg_header .reg_h_right {
        height: 110px;
        flex: 1;
        padding-top: 50px;
        padding-left: 30px;
    }


.reg_back {
    /*设置整体的尺寸、背景色、边距等*/
    width: 850px;
    height: 400px;
    border: 8px solid #eeeeee;
    background: white;
    margin: auto;
    margin-top: 20px;
}

.reg_left {
    /*设置左浮动和外边距*/
    float: left;
    margin: 20px;
}

    .reg_left > p:first-child {
        /*设置段落（新用户注册）颜色和字体大小*/
        color: gray;
        font-size: 20px;
    }

    .reg_left > p:last-child {
        /*设置段落（USER REGISTER）颜色和字体大小*/
        color: #A6A6A6;
        font-size: 20px;
    }

.reg_center {
    /*设置中间的各种输入框等*/
    float: left;
    width: 450px;
}

.reg_right {
    /*设置右边段落浮动和外间距*/
    float: right;
    margin: 30px;
}

    .reg_right > p:first-child {
        font-size: 15px;
    }

    .reg_right p a {
        /*设置超链接（立即登录）颜色*/
        color: crimson;
    }

.td_left {
    /*设置表单中字体对齐方式和宽度、高度*/
    width: 100px;
    text-align: right;
    height: 40px;
}

.td_right {
    /*设置输入框内边距*/
    padding-left: 40px;
}

#username, #password, #Email{
    /*设置输入框大小和边框*/
    width: 200px;
    height: 50px;
    border: 1px solid #A4A4A4;
    /* 设置边框为圆角 */
    border-radius: 8px;
    padding-left: 10px;
}

#checkcode {
    /*验证码宽度*/
    width: 100px;
}

#img_check {
    /*验证码图片*/
    vertical-align: middle;
    height: 30px;
    width: 95px;
}

#btn_sub {
    /*注册按钮*/
    margin-left: 50px;
    background: orangered;
    color: whitesmoke;
    width: 150px;
    height: 40px;
    border: 1px solid gray;
}



</style>