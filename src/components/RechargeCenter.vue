<template>
  <div>
    <el-dialog title="充值中心" :visible.sync="visible" width="30%" :close-on-click-modal="false" :show-close="false"
      @close="handleClose" append-to-body>
      <span>当前余额：{{ Math.floor(curBalance) }}</span><br>
      <span>请输入充值金额：</span>
      <el-input-number v-model="chargeNum" :min="1" :max="10000"></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleRecharge">充 值</el-button>
      </span>
      <!-- 支付dialog -->
      <el-dialog width="30%" title="支付界面" :visible.sync="dialogPayVisible" append-to-body>
        <span style="font-weight: bold; color: red; font-size: 16px;">请输入密码：</span>
        <el-input placeholder="请输入密码" v-model="inputPsw" show-password></el-input>
        <el-button @click="handleCancelPay">取消</el-button>
        <el-button @click="handlePay">确定支付</el-button>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
  name:'RechargeCenter',
  data(){
    return {
      chargeNum:0,
      inputPsw:'',
      dialogPayVisible:false,
      curBalance:0
    }
  },
  props:{
    visible:{
      type:Boolean,
      default:false
    }
  },
  computed:{
    ...mapState(['username','token','balance','userId'])
  },
  mounted(){
    this.curBalance=this.balance
  },
  methods: {
    async handleCommitReharge(){
      await axios.post(`${this.BASE_URL}/users/recharge`,{
        id:this.userId,
        chargeNum:this.chargeNum
      },{
        headers:{
          token:this.token
        }
      }
    ).then(
      response=>{
        const result=response.data
        if(result.code===200){
        console.log("handleCommitReharge请求成功")
          this.$store.commit('RenewBalance',result.data)
            this.curBalance=result.data
            this.dialogPayVisible=false
            this.$message({
              message: '充值成功',
              type: 'success'
            })
        }else{
          console.log("handleCommitReharge请求失败")
        }
      }
    ).catch(
      error=>{
        console.log("handleCommitReharge请求失败,error:",error)
      }
    )
    },
    //确认支付
    async handlePay() {

      //初步检验密码
      if (!this.inputPsw.trim()) {
        this.$message({
          message: '密码不得为空',
          type: 'warning'
        })
        return;
      }
      if (this.inputPsw.length < 6) {
        this.$message({
          message: '密码不得小于六位',
          type: 'warning'
        })
        return;
      }

      const userLogin = {
        username: this.username,
        password: this.inputPsw
      }
      //后端检验密码
      await axios.post(`${this.BASE_URL}/login`, userLogin, {
        headers: {
          token: this.token
        }
      }).then(
        response => {
          const result = response.data
          if (result.code == 200) {
            console.log('密码校验成功')
            this.handleCommitReharge()
          } else {
            this.$message({
              message: '密码错误',
              type: 'error'
            })
          }
        }
      ).catch(
        error => {
          console.log(error.message)
          this.$message({
            message: '密码错误',
            type: 'error'
          })
        }
      )

    },
    //取消支付
    handleCancelPay() {
      this.inputPsw = ''
      this.dialogPayVisible = false
    },
    handleRecharge(){
      this.dialogPayVisible=true
    },
    handleClose(){
      this.$emit('close')
    },
    handleConfirm() {
      this.$emit('confirm'); // 触发确认事件
    },
  }
}
</script>

<style>

</style>