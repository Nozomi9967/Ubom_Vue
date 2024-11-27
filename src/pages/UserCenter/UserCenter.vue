<template>
  <div class="usercenter">
    <!-- 修改昵称 -->
    <span v-show="!NickName.isEdit">{{ UserInfo.nickname }}</span>
    <input v-show="NickName.isEdit" v-model="UserInfo.nickname" type="text" @blur="NickNameBlurHandler">
    <button @click="ChangeEdit">修改昵称</button>

    {{ createTime }}<br>
    {{ updateTime }}<br>

    <!-- 上传头像 -->
    <img :src="UserInfo.image" alt="暂无图片" />
    <input type="file" @change="uploadImage"><br>

    <!-- 修改邮箱 -->

    <span class="input-group-text" id="basic-addon1">
      邮箱地址
      <span v-show="!Email.isEdit">{{ UserInfo.email }}</span>
      <input type="text" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"
        v-model="UserInfo.email" v-show="Email.isEdit">
    </span>
    <span v-show="Email.isEdit">
      <!-- 请输入密码以修改邮箱：
      <input
      type="password"
      :value="inputPsw"> -->

      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label for="inputPassword6" class="col-form-label">输入密码以修改邮箱</label>
        </div>
        <div class="col-auto">
          <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline"
            v-model="inputPsw">
        </div>
        <div class="col-auto">
          <span id="passwordHelpInline" class="form-text">
            密码长度需要在6-12区间内
          </span>
        </div>
      </div>

    </span>
    <button v-show="Email.isEdit" @click="cancelEmailEdit">取消修改</button>
    <button @click="EditEmailHandler">{{ EditMsg }}</button><br>

    <!-- 提交修改 -->
    <button @click="SubmitInfo">提交修改</button>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
  name: 'UserCenter',
  data() {
    return {
      inputPsw: '',
      createTime: '',
      updateTime: '',
      UserInfo: {
        id: -1,
        nickname: '',
        image: '',
        email: ''
      },
      NickName: {
        isEdit: false
      },
      Email: {
        isEdit: false
      },
      EditMsg: '修改'
    }
  },
  computed: {
    ...mapState(['username', 'token', 'userId'])
  },
  mounted() {
    this.fetchUserInfo()
    this.UserInfo.id = this.userId
    // console.log('id:',this.UserInfo.id)
  },
  methods: {
    async SubmitEmailModif() {
      const resquestData = {
        id: this.UserInfo.id,
        email: this.UserInfo.email,
        password: this.inputPsw
      }
      const response = await axios.put('http://localhost:8080/users/email', resquestData, {
        headers: {
          token: this.token
        }
      })
      const result = response.data
      console.log(result)
      if (result.code === 200) {
        // console.log('请求成功',result.data)
        alert('修改成功')
      } else {
        // console.log('请求失败',result.message)
        alert('修改失败')
      }

    },
    cancelEmailEdit() {
      this.Email.isEdit = false
      this.EditMsg = '修改'
    },
    EditEmailHandler() {
      if (!this.Email.isEdit) {
        this.Email.isEdit = true
        this.EditMsg = '确认修改'
      } else {
        this.SubmitEmailModif()
      }
    },
    async SubmitInfo(event) {
      event.preventDefault(); // 阻止表单默认提交行为
      console.log('submit了')
      console.log('UserInfo:', this.UserInfo)
      const response = await axios.put('http://localhost:8080/users/update', this.UserInfo, {
        headers: {
          'Content-Type': 'application/json',
          token: this.token
        }
      })
      const result = response.data
      console.log(result)
    },
    NickNameBlurHandler() {
      this.NickName.isEdit = false
    },
    ChangeEdit() {
      this.NickName.isEdit = !this.NickName.isEdit
    },
    uploadImage(event) {
      const file = event.target.files[0]
      const formData = new FormData();
      formData.append('file', file);
      // formData.append('token',this.token)

      axios.post('http://localhost:8080/users/upload', formData, {
        headers: {
          token: this.token
        }
      })
        .then(response => {
          console.log('请求成功', response.data);
          this.UserInfo.image = response.data.message
        })
        .catch(error => {
          console.log('请求失败', error.message);
        });

    },
    fetchUserInfo() {
      axios.get('http://localhost:8080/users/all', {
        params: { username: this.username },
        headers: {
          token: this.token
        }
      }).then(
        response => {
          console.log('请求成功', response.data)
          console.log('nickname为', response.data.data.records[0].nickname)
          this.UserInfo.nickname = response.data.data.records[0].nickname
          this.UserInfo.image = response.data.data.records[0].image
          this.UserInfo.email = response.data.data.records[0].email
          this.createTime = response.data.data.records[0].createTime
          this.updateTime = response.data.data.records[0].updateTime
        },
        error => {
          console.log('请求失败', error.message)
        }
      )
    }
  }
}
</script>

<style scoped lang="css">
.usercenter {
  margin-top: 100px;
}
</style>