<template>
    <!-- <div style="text-align: center;" class="S30">
    <span style="margin-bottom: 100px;">登录界面</span><br><br>
    账号<input class="space" v-model="User.username" placeholder="请输入内容"><br>
    密码<input class="space" placeholder="请输入密码" v-model="User.password" show-password><br>
    <button class="BtnSize" @click="submitInfo">登录</button>
  </div> -->

    <div>
        <!--头部-->
        <div id="header">
            <!--头部中间信息-->
            <div class="h_center">
                <p>欢迎来到二手书交易平台：请先登录！</p>
            </div>
        </div>


        <!--中部-->
        <div id="login_body">
            <div class="login_b_center">
                <div class="login_bg">
                    <h1>密码登录</h1>
                    <form action="#" id="login">
                        <!--                //用户名-->
                        <div class="userName">
                            <span></span>
                            <input class="userName" v-model="User.username" placeholder="请输入内容"
                                @blur="handleUserNameBlur" @focus="handleUserNameFocus">
                            <p v-if="showUserNameErrorMsg">用户名长度不得小于5</p>
                        </div>
                        <!--                //密码-->
                        <div class="password">
                            <span></span>
                            <input class="password" placeholder="请输入密码" v-model="User.password" show-password
                                @blur="handlePswBlur" @focus="handlePswFocus">
                            <p v-if="showPswErrorMsg">密码长度需要在6-12区间内</p>
                        </div>
                        <!--                //登录按钮-->
                        <div class="login_btn">
                            <!-- <a href="index.html"> -->
                            <button class="login_btn" @click="submitInfo">登录</button>
                            <!-- </a> -->
                        </div>
                        <div class="forgot_password">
                            <!-- <router-link>忘记密码</router-link> -->
                            <router-link to="/regis">注册账号</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'UserLogin',
    inheritAttrs: false,
    data() {
        return {
            User: {
                username: '',
                password: ''
            },
            showUserNameErrorMsg: false,
            showPswErrorMsg: false,
        }

    },
    methods: {
        async submitInfo(event) {
            event.preventDefault(); // 阻止表单默认提交行为
            const response = await axios.post('http://localhost:8080/login', this.User, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            alert('正在加载中')
            const result = response.data
            console.log(result)
            if (result.code == 200) {
                console.log('登录成功', '你的令牌是', result.data.jwt)
                localStorage.setItem('token', result.data.jwt)
                localStorage.setItem('userId', result.data.id)
                localStorage.setItem('userName', this.User.username)
                //基于内存，一刷新就没了，要存入localstorage
                // this.$store.commit('SetJWT',result.data.jwt)
                // this.$store.commit('SetUserId',result.data.id)
                // this.$store.commit('SetUserName',this.User.username)
                this.$store.commit('AUTH')
                this.$router.push('/mainpage')
            } else {
                console.log('登录失败', result.message)
                alert('登录失败');
            }

        },
        handleUserNameErrorMsg() {
            if (this.User.username.length < 5)
                this.showUserNameErrorMsg = true;
            else
                this.showUserNameErrorMsg = false;

        },
        handlePswErrorMsg() {
            if (this.User.password.length < 6 || this.User.password.length > 12)
                this.showPswErrorMsg = true
            else
                this.showPswErrorMsg = false
        },
        handleUserNameBlur() {
            this.showUserNameErrorMsg = false
        },
        handleUserNameFocus() {
            this.handleUserNameErrorMsg()
        },
        handlePswBlur() {
            this.showPswErrorMsg = false
        },
        handlePswFocus() {
            this.handlePswErrorMsg()
        }
    },
    watch: {
        'User.username': {
            handler: 'handleUserNameErrorMsg'
        },
        'User.password': {
            handler: 'handlePswErrorMsg'
        }
    }

}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#header {
    height: 88px;
    border: 1px solid;
    margin-top: 50px;
}

#header .h_center {
    width: 1200px;
    height: 88px;
    margin: 0 auto;
}


#header .h_center p {
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

#login_body {
    height: 600px;
    background-image: url("./images/boat.jpg");
    background-position: center;
    background-size: 1200px 600px;
}

#login_body .login_b_center {
    width: 1200px;
    height: 600px;
    margin: 0 auto;
    position: relative;
}

#login_body .login_bg {
    width: 350px;
    height: 351px;
    background: rgba(255, 255, 255, 0.9);
    position: absolute;
    right: -10px;
    top: 80px;
    padding: 30px;
}

#login div {
    height: 40px;
    margin-top: 20px;
}

#login span {
    width: 40px;
    height: 40px;
    display: inline-block;
    background: red;
    float: left;
    border: 1px gray;
}

#login .userName span {
    background-image: url("./images/login.png");
}

#login .password span {
    background-image: url("./images/password.png");
}

#login input {
    width: 250px;
    height: 40px;
    float: left;
}

#login .login_btn {
    background-color: coral;
    width: 300px;
    border: none;
    color: whitesmoke;
    float: left;
}

#login .login_btn:hover {
    color: blue;
    float: left;
}

#login .forgot_password {
    text-align: right;
    margin-top: 20px;
}

a {
    text-decoration: none;
}
</style>
