<template>
  <div class="header">
    <center style="width: 186vh;">
      <span class="title">二手书交易平台</span>
      <ul>
        <li v-show="!isAuthentic"><router-link to="/regis">注册</router-link></li>
        <li v-show="!isAuthentic"><router-link to="/login">登录</router-link></li>
        <!-- <li v-show="isAuthentic"><router-link to="/usercenter">个人中心</router-link></li> -->
        <li v-show="isAuthentic" @click="handleOpenDrawer">
          <el-avatar style="box-sizing: border-box" size=large :src="avatar"></el-avatar>
        </li>
      </ul>
    </center>
    <div v-show="isAuthentic">
      <el-menu
        style="margin-top: 20px;display: flex; justify-content: flex-start;margin-left: 250px;margin-right: 250px;"
        class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">书摊</el-menu-item>
      </el-menu>
    </div>

    <!-- 侧边拉出功能区 -->
    <el-drawer :visible.sync="drawer" :with-header="false">
      <div>
        <!-- 头像 -->
        <div style="text-align: center;margin-top: 20px;">
          <el-avatar style="box-sizing: border-box;width: 100px;height: 100px;" :src="avatar"></el-avatar>
        </div>
        <!-- 余额 -->
        <div style="text-align: center;margin-top: 30px;">
          <span class="balance">余额：￥{{ Math.floor(balance) }}</span>
        </div>
        <!-- 功能选择 -->
        <div>
          <el-menu class="el-menu-vertical-demo" style="margin-top: 50px;margin-left: 30px">
            <el-menu-item index="1">
              <i class="el-icon-user-solid"></i>
              <span slot="title">个人资料</span>
            </el-menu-item>
            <el-menu-item index="2" @click="handleOpenBookManagement">
              <i class="el-icon-collection"></i>
              <span slot="title">书籍管理</span>

            </el-menu-item>
            <el-menu-item index="3" @click="handleOpenRechargeCenter">
              <i class="el-icon-wallet"></i>
              <span slot="title">充值中心</span>
            </el-menu-item>
            <el-menu-item index="4" @click="handleOpenShopCart">
              <i class="el-icon-shopping-cart-full"></i>
              <span slot="title">购物车</span>
              <el-dialog title="购物车清单" :show-close="false" :visible.sync="dialogShopCartVisible"
                @before-close="handleBeforeClose" :modal="false" append-to-body>
                <el-table ref="multipleTable" :data="shopCart" tooltip-effect="dark" style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column property="bookname" label="书名" width="150"></el-table-column>
                  <el-table-column property="author" label="作者" width="200"></el-table-column>
                  <el-table-column property="price" label="价格"></el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">

                  <el-button @click.stop="handleCloseShopCart">关闭</el-button>
                  <el-button @click.stop="handleDeleteShopCart">删除</el-button>
                  <el-button @click.stop="handleShopCartPay">支付</el-button>
                  <!-- 支付dialog -->
                  <el-dialog width="30%" title="支付界面" :visible.sync="dialogPayVisible" append-to-body>
                    <span style="font-weight: bold; color: red; font-size: 16px;">请输入密码：</span>
                    <el-input placeholder="请输入密码" v-model="inputPsw" show-password></el-input>
                    <el-button @click="handleCancelPay">取消</el-button>
                    <el-button @click="handlePay">确定支付</el-button>
                  </el-dialog>
                </span>
              </el-dialog>
            </el-menu-item>
          </el-menu>
        </div>
        <!-- 退出登录 -->
        <div class="exitBtn">
          <el-button type="danger" autofocus @click="handleExit" plain>退出登录</el-button>
        </div>
      </div>
    </el-drawer>

    <!-- 书籍管理 -->
    <BookManagement :visible="dialogBookManagementVisible" @close="handleCloseBookManagement"
      @confirm="handleConfirmBookManagement"/>

    <!-- 充值中心 -->
    <RechargeCenter :visible="dialogRechargeCenterVisible" @close="handleCloseRechargeCenter"
      @confirm="handleConfirmRechargeCenter"/>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import BookManagement from './BookManagement.vue';
import RechargeCenter from './RechargeCenter.vue';
import axios from 'axios';
export default {
  name: 'Header',
  data(){
    return {
      drawer:false,
      dialogShopCartVisible:false,
      dialogPayVisible:false,
      dialogBookManagementVisible:false,
      dialogRechargeCenterVisible:false,
      selectedData:[],
      curShopCart:[],
      inputPsw:'',
      payCount:0
    }
  },
  components:{
    BookManagement,RechargeCenter
  },
  props:['avatar','balance','shopCart'],
  computed: {
    ...mapState(['isAuthentic']),
    ...mapState(['username','userId','token']),
    
  },
  mounted(){
    this.$store.commit('LoadBaseInfo')
    this.curShopCart=this.shopCart
  },
  watch:{
    //监视购物车中选中的商品，实时计算支付总额
    'selectedData':{
      handler(){
        this.payCount=0
        this.selectedData.forEach((item)=>this.payCount+=item.price)
      }
    }
  },
  methods:{
    handleOpenRechargeCenter() {
      this.dialogRechargeCenterVisible = true;
    },
    handleCloseRechargeCenter() {
      this.dialogRechargeCenterVisible = false;
    },
    handleConfirmRechargeCenter() {
      this.dialogRechargeCenterVisible = false;
    },
    handleOpenBookManagement() {
      this.dialogBookManagementVisible = true; // 显示书籍管理对话框
    },
    handleCloseBookManagement() {
      this.dialogBookManagementVisible = false; // 关闭书籍管理对话框
    },
    handleConfirmBookManagement() {
      // 确认书籍管理逻辑
      this.dialogBookManagementVisible = false;
    },
    triggerRefresh(){
      this.$emit('refresh')
    },
    //提交订单
    async handleCommitOrder(){
      //创建订单
      var orders=[]
      this.selectedData.forEach((item)=>orders.push({userId:this.userId,goodsId:item.id}))
      console.log("orders:",orders)

      //提交订单
      await axios.post(`${this.BASE_URL}/order/add`,orders,{
        headers:{
          token:this.token
        }
      }).then(
        response=>{
          const result=response.data
          if(result.code==200){
            console.log('订单提交成功')
            this.$emit('update:balance', this.balance-this.payCount)//前端实现余额变化
            this.triggerRefresh()//刷新页面
            this.handleDeleteShopCart()//删除购物车中已支付的商品
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
    async handlePay(){

      //初步检验密码
      if(!this.inputPsw.trim()){
        this.$message({
          message:'密码不得为空',
          type:'warning'
        })
        return;
      }
      if(this.inputPsw.length<6){
        this.$message({
          message:'密码不得小于六位',
          type:'warning'
        })
        return;
      }

      const userLogin={
        username:this.username,
        password:this.inputPsw
      }
      //后端检验密码
      await axios.post(`${this.BASE_URL}/login`,userLogin,{
        headers:{
          token:this.token
        }
      }).then(
        response=>{
          const result=response.data
          if(result.code==200){
            console.log('密码校验成功')
            this.handleCommitOrder()
          }else{
            this.$message({
            message:'密码错误',
            type:'error'
          })
          }
        }
      ).catch(
        error=>{
          console.log(error.message)
          this.$message({
            message:'密码错误',
            type:'error'
          })
        }
      )

    },
    //取消支付
    handleCancelPay(){
      this.inputPsw=''
      this.dialogPayVisible=false
    },
    //支付购物车中的商品
    handleShopCartPay(){
      //检验是否有选中商品
      if(this.selectedData.length==0){
        this.$message({
          message:'您还未选择商品',
          type:'warning'
        })
        return;
      }

      //检验余额
      if(this.balance<this.payCount){
        this.$message({
            message:'余额不足',
            type:'error'
          })
          return;
      }

      this.dialogPayVisible=true
    },
    //删除购物车中选中的商品
    handleDeleteShopCart(){
      for (let i = this.curShopCart.length - 1; i >= 0; i--) {
        if (this.selectedData.includes(this.curShopCart[i])) {
          // console.log('删除了', this.curShopCart[i]);
          this.curShopCart.splice(i, 1);
        }
      }
      this.$message('删除成功')
    },
    handleCloseShopCart(){
      this.dialogShopCartVisible = false
      this.$refs.multipleTable.clearSelection()//清除已选择
      this.$store.commit('RenewShopCart',this.curShopCart)//更新ShopCart
    },
    handleSelectionChange(val){
      this.selectedData=val
    },
    handleBeforeClose(done){
      console.log('handleBeforeClose')
      this.dialogShopCartVisible=false
      done()
    },
    handleOpenShopCart(){
      console.log('handleOpenShopCart')
      if(!this.dialogShopCartVisible)
        this.dialogShopCartVisible=true;
    },
    handleExit(){
      this.$message('已退出登录')
      this.drawer=false
      localStorage.clear()
      this.$store.commit('UNDO_AUTH')
      setTimeout(()=>{this.$router.push('/login')},500)
    },
    handleOpenDrawer(){
      this.drawer=true
    },
    handleCloseDrawer(){
      this.drawer=false
    },
    handleUserCenter(){
      this.$router.push('/usercenter')
    },
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

.el-avatar-custom {
    padding: 0; /* 去除内边距 */
    border: none; /* 去除边框 */
    box-sizing: border-box; /* 确保设置的width包含边框和内边距等 */
}

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

.header center ul {
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

.header center li {
  /* 使li内容横向浮动，即横向排列  */
  margin-right: 2%;
  /* 两个li之间的距离*/
  position: relative;
  overflow:hidden;
  float: right;
}

.balance{
  color: #bf7f5f;
  font-weight: bold;
  font-size: 20px;
}

.el-menu-vertical-demo{
  position: relative;
}

.exitBtn{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom:10%;
}

.el-menu-vertical-demo span{
  font-size: 18px;
  font-weight:600;
}

.el-menu-vertical-demo el-menu-item{
  margin-top: 8px;
}

</style>