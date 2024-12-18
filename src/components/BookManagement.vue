<template>
  <div>
    <el-dialog title="书籍管理" :visible.sync="visible" width="50%" :close-on-click-modal="false" :show-close="false" @close="handleClose" append-to-body>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ curSelect }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">{{ post }}</el-dropdown-item>
          <el-dropdown-item command="b">{{ buy }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div>
        <!-- 我发布的 -->
        <el-table :data="postBook" v-show="curSelect===post" style="width: 100%">
          <el-table-column prop="bookname" label="书名" width="180"></el-table-column>
          <el-table-column prop="author" label="作者" width="180"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="sold" :formatter="formatSold" label="是否卖出"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
            <div style="float: right;">
              <el-button @click="handleEdit(scope.row)" type="primary" size="middle">编辑</el-button>
            </div>
              <!-- 删除 -->
              <div style="float: right;">
                <el-popconfirm confirm-button-text='确定' cancel-button-text='算了' icon="el-icon-info" icon-color="red"
                  title="你确定要删除吗？" @confirm="delItem(scope.row.id)">
                  <el-button slot="reference" type="danger">删除</el-button>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 我购买的 -->
         <!-- 我发布的 -->
        <el-table :data="purchaseBook" v-show="curSelect===buy" style="width: 100%">
          <el-table-column prop="bookname" label="书名" width="180"></el-table-column>
          <el-table-column prop="author" label="作者" width="180"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="sold" :formatter="formatSold" label="是否卖出"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
            <div style="float: right;">
              <el-button @click="handleEdit(scope.row)" type="primary" size="middle">编辑</el-button>
            </div>
              <!-- 删除 -->
              <div style="float: right;">
                <el-popconfirm confirm-button-text='确定' cancel-button-text='算了' icon="el-icon-info" icon-color="red"
                  title="你确定要删除吗？" @confirm="delItem(scope.row.id)">
                  <el-button slot="reference" type="danger">删除</el-button>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </el-dialog>

    <!-- dialog -->
    <el-dialog title="图书详细信息" top="2vh" width="100vh" :visible.sync="dialogFormVisible" :append-to-body="true">
      <el-form :model="curItem">
        <el-form-item label="书名" :label-width="formLabelWidth">
          <el-input v-model="curItem.bookname" style="width: 300px;" autocomplete="off"></el-input>
          <span class="margin" v-show="!curItem.bookname">书名不能为空</span>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="curItem.author" style="width: 300px;" autocomplete="off"></el-input>
          <span class="margin" v-show="!curItem.author">作者不能为空</span>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input-number v-model="curItem.price" controls-position="right" :min="0" :max="500"></el-input-number>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input type="textarea" autosize placeholder="请输入书籍描述" v-model="curItem.description">
          </el-input>
        </el-form-item>
        <el-form-item label="发布时间" :label-width="formLabelWidth">
          <el-input v-model="curItem.createTime" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改时间" :label-width="formLabelWidth">
          <el-input v-model="curItem.updateTime" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图书编号" :label-width="formLabelWidth">
          <el-input v-model="curItem.id" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布者" :label-width="formLabelWidth">
          <el-input v-model="curItem.userName" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">

          <el-upload class="avatar-uploader" action="http://localhost:8080/books/upload" :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <!-- <img v-if="curItem.image" :src="curItem.image" class="avatar"> -->
            <el-image v-if="curItem.image" style="width: 100px; height: 100px" :src="curItem.image"
              fit=cover></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCommitModif">修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
  name:'BookManagement',
  data(){
    return {
      curSelect:'我发布的',
      post:'我发布的',
      buy:'我购买的',
      postBook:[],
      purchaseBook:[],
      curItem:{},
      dialogFormVisible:false,
      iscurItemChange:false,
      formLabelWidth:'120'
    }
  },
  props:{
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch:{
    'curItem':{
      deep:true,
      handler(){
        this.iscurItemChange=true
      }
    }
  },
  computed:{
    ...mapState(['username','token','userId'])
  },
  mounted(){
    this.fetchBookInfo()
  },
  methods:{
      //删除vuecomponent中的item，达到刷新的效果
      delTableDataItem(id){
      const IndexToDel =this.postBook.findIndex(item=>item.id===id) 
      if(IndexToDel!=-1){
        this.postBook.splice(IndexToDel,1)
      }
    },
      //删除数据库中的item
      async delItem(id){
      console.log(id)
     
      const response=await axios.delete(`${this.BASE_URL}/books/${id}`,{
        headers:{
          token:this.token
        }
      })
      const result = response.data
      console.log(result)
      if (result.code === 200) {
        console.log('请求成功', result.data)
        this.delTableDataItem(id)
        this.$message('删除成功')
      } else {
        console.log('请求失败', result.message)
        this.$message('删除失败')
      }
    },
      //上传修改的数据
    async handleCommitModif() {
      console.log('@@@@', this.iscurItemChange)
      if (!this.iscurItemChange) {
        this.$message('你并没有更改任何信息~')
        this.dialogFormVisible = false
        return false
      }
      console.log('curItem:', this.curItem)
      var ModifData = {
        id: this.curItem.id,
        bookname: this.curItem.bookname,
        author: this.curItem.author,
        price: this.curItem.price,
        image: this.curItem.image
      }
      const response = await axios.put('http://localhost:8080/books', ModifData, {
        headers: {
          token: this.token
        }
      })
      const result = response.data
      console.log(result)
      if (result.code === 200) {
        console.log('请求成功', result.data)
        this.iscurItemChange = false
        this.$message('修改成功')
      } else {
        console.log('请求失败', result.message)
        this.$message('修改失败')
      }

      this.dialogFormVisible = false
    },
    //上传图片，获取图片url
    async beforeAvatarUpload(file) {
      console.log("file:",file)
      const formdata=new FormData()
      formdata.append('file',file)
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      if (!isImage) {
        this.$message.error('请上传正确格式的图片文件（jpg、png、jpeg）');
        return false;
      }
      return await axios.post('http://localhost:8080/books/upload', formdata,{
        headers:{
          token:this.token
        }
      }).then((response) => {
        // 处理成功逻辑
        console.log('url:',response.data.message)
        
        if(this.isInsertUpload){
          console.log('image赋值完了')
          this.insertform.image=response.data.message
          console.log('imageurl:',this.insertform.image)
          this.$message('上传成功，图片稍后显示~~~')
          
        }else{
          this.curItem.image = response.data.message;
        }

        return false; // 确认这里返回 false
    }).catch((error) => {
        console.error('文件上传失败', error);
        return false; // 确认这里也返回 false
    });

    },
    handleEdit(row){
      this.curItem=row
      this.dialogFormVisible=true
      setTimeout(()=>{this.iscurItemChange=false},500)
    },
    formatSold(row){
      return row.sold?'是':'否'
    },
    async fetchBookInfo(){
      //获取用户发布书籍信息
      await axios.get(`${this.BASE_URL}/books/getmypost`,{
        params:{
          username:this.username
        },
        headers:{
          token:this.token
        }
      }).then(
        response=>{
          const result=response.data
          if(result.code==200){
            console.log('fetchBookInfo请求成功')
            // console.log(result.data)
            this.postBook=result.data
          }else{
            console.log('fetchBookInfo请求失败')
          }
        }
      ).catch(
        error=>{
          console.log(error.message)
        }
      )

      //获取用户购买书籍信息
      await axios.get(`${this.BASE_URL}/books/getmypurchuse`,{
        params:{
          id:this.userId
        },
        headers:{
          token:this.token
        }
      }).then(
        response=>{
          const result=response.data
          if(result.code==200){
            console.log('fetchBookInfo请求成功')
            // console.log(result.data)
            this.purchaseBook=result.data
          }else{
            console.log('fetchBookInfo请求失败')
          }
        }
      ).catch(
        error=>{
          console.log(error.message)
        }
      )
    },
    handleClose() {
      this.$emit('close'); // 触发关闭事件
    },
    handleConfirm() {
      this.$emit('confirm'); // 触发确认事件
    },
    handleCommand(command) {
        if(command=='a'){
          this.curSelect=this.post
        }else{
          this.curSelect=this.buy
        }
      }
  }
}
</script>

<style>

</style>