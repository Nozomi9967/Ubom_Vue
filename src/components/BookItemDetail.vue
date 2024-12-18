<template>
  <div>
    <el-dialog title="书籍详情" :visible.sync="visible" width="30%" @click="handleClose" center>
      <el-form :model="currentItem">
        <el-form-item label="书名:" :label-width="formLabelWidth">
          <el-input v-model="currentItem.bookname" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者:" :label-width="formLabelWidth">
          <el-input v-model="currentItem.author" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格:" :label-width="formLabelWidth">
          <el-input v-model="currentItem.price" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-input v-model="currentItem.type" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布时间:" :label-width="formLabelWidth">
          <el-input v-model="currentItem.createTime" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布者:" :label-width="formLabelWidth">
          <el-input v-model="currentItem.userName" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细图片：" :label-width="formLabelWidth">
          <el-image style="width: 100px; height: 100px" :src="currentItem.image"
            :preview-src-list="[currentItem.image]">
          </el-image>
        </el-form-item>
        <el-form-item label="描述：:" :label-width="formLabelWidth">
          <el-button type="info" round @click="openDescri()">点我查看</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="success" @click="handleAddToCart">添加购物车</el-button>
        <el-button type="primary" @click="handlePayDirectly">购买</el-button>
        <!-- 支付dialog -->
        <el-dialog width="30%" title="支付界面" :visible.sync="dialogPayVisible" append-to-body>
          <span style="font-weight: bold; color: red; font-size: 16px;">请输入密码：</span>
          <el-input placeholder="请输入密码" v-model="inputPsw" show-password></el-input>
          <el-button @click="handleCancelPay">取消</el-button>
          <el-button @click="handlePay">确定支付</el-button>
        </el-dialog>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
  name: 'BookItemDetail',
  data(){
    return {
      dialogFormVisible:false,
      dialogPayVisible:false,
      inputPsw:'',
      formLabelWidth:120
    }
  },
  computed:{
    ...mapState(['userId','username','token'])
  },
  props:{
    currentItem:{},
    visible: {
      type: Boolean,
      default: false,
    },
  },
  methods:{
    handleClose(){
      this.$emit('close')
    },
    openDescri(){
      this.$alert(this.currentItem.description,'书籍描述')
    },
       //提交订单
       async handleCommitOrder(){
      //创建订单
      var order=[{userId:this.userId,goodsId:this.currentItem.id}]
      console.log("order:",order)

      //提交订单
      await axios.post(`${this.BASE_URL}/order/add`,order,{
        headers:{
          token:this.token
        }
      }).then(
        response=>{
          const result=response.data
          if(result.code==200){
            console.log('订单提交成功')
            //刷新页面
            this.books[this.currentItemIndex].forEach((item,index)=>{
              if(item==this.currentItem){
                this.books[this.currentItemIndex].splice(index,1)
              }
            })
            this.dialogPayVisible=false//关闭支付窗口
            this.$message({
            message:'支付成功',
            type:'success'
          })
          }else{
            console.log('订单提交失败')
            this.$message({
            message:result.message,
            type:'error'
          })
          }
        }
      ).catch(
        error=>{
          console.log(error.message)
          this.$message({
            message:'支付失败',
            type:'error'
          })
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
            this.handleCommitOrder()
            this.dialogFormVisible=false
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
    handlePayDirectly(){
      this.dialogPayVisible=true
    },
    handleAddToCart(){
      this.$store.commit('InsertShopCart',this.currentItem)
      this.$message('添加购物车成功')
      this.dialogFormVisible=false
    },
    openDescri(){
      this.$alert(this.currentItem.description,'书籍描述')
    },
  }
}
</script>

<style></style>