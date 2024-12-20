<template>
  <div>
    <!-- 搜索框 -->
    <el-input
      placeholder="请输入关键词"
      v-model="SearchKeyWord"
      class="input-with-select"
    >
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="书名" value="1"></el-option>
        <el-option label="作者" value="2"></el-option>
        <el-option label="发布者" value="3"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <!-- 类型选择-->
    <el-select v-model="typeSelect" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <!-- 价格范围 -->
    <el-input style="width: 80px" v-model="Pagi.priceRange[0]"></el-input>——
    <el-input style="width: 80px" v-model="Pagi.priceRange[1]"></el-input>
    <!-- 发布时间排序 -->
    <el-dropdown @command="handleCreateTimeAscCommand">
      <span class="el-dropdown-link">
        按发布时间排序<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :disabled="Pagi.isCreateTimeAsc == 1" command="Asc"
          >升序</el-dropdown-item
        >
        <el-dropdown-item :disabled="!Pagi.isCreateTimeAsc == 1" command="Desc"
          >降序</el-dropdown-item
        >
        <el-dropdown-item
          :disabled="Pagi.isCreateTimeAsc == 2"
          command="disable"
          >不使用</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 价格排序 -->
    <el-dropdown @command="handlePriceAscCommand">
      <span class="el-dropdown-link">
        按价格排序<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :disabled="Pagi.isPriceAsc == 1" command="Asc"
          >升序</el-dropdown-item
        >
        <el-dropdown-item :disabled="!Pagi.isPriceAsc == 1" command="Desc"
          >降序</el-dropdown-item
        >
        <el-dropdown-item :disabled="Pagi.isPriceAsc == 2" command="disable"
          >不使用</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 恢复默认 -->
     <el-button type="primary" @click="handleReset">恢复默认</el-button>

    <!-- 数据展示 -->
    <el-row v-for="(book, index) in tableData" :key="index" class="book-item">
      <el-col :span="24">
        <el-card shadow="hover" @click.native="handleOpenItemDialog(book)">
          <div class="book-info">
            <div class="book-image">
              <img :src="book.image" width="200px" height="200px" alt="书籍封面" />
            </div>
            <div class="book-details">
              <div class="book-title">书名: {{ book.bookname }}</div>
              <div class="book-author">作者: {{ book.author }}</div>
              <div class="book-type">类型: {{ book.type }}</div>
              <div class="book-price">价格: {{ book.price }} 元</div>
              <div class="book-sold">是否售出: {{ book.sold ? '已售出' : '未售出' }}</div>
              <div class="book-create-time">创建时间: {{ book.createTime }}</div>
              <div class="book-update-time">更新时间: {{ book.updateTime }}</div>
              <div class="book-description">描述: {{ book.description }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

        <BookItemDetail :visible="dialogBookItemDetailVisible" :currentItem="currentItem"
      @close="handleBookItemDetailClose" />

    <!-- 分页 -->
     <el-pagination
  background
  :page-size="Pagi.pagesize"
  :currentPage="Pagi.currentPage"
  @current-change="handlePageChange"
  layout="prev, pager, next"
  :total="total">
</el-pagination>
  </div>
</template>

<script>
import BookItemDetail from "@/components/BookItemDetail.vue"
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Search",
  components:{BookItemDetail},
  data() {
    return {
      SearchKeyWord: "",
      select: "",
      typeSelect: "",
      dialogBookItemDetailVisible:false,
      currentItem:{},
      options: [
        {
          value: "1",
          label: "小说",
        },
        {
          value: "2",
          label: "传记",
        },
        {
          value: "3",
          label: "历史",
        },
        {
          value: "4",
          label: "教科书",
        },
        {
          value: "5",
          label: "科普",
        },
        {
          value: "6",
          label: "宗教",
        },
      ],
      total: 10, //数据总数（一共的）
      Pagi: {
        currentPage: 1, //当前页码
        pagesize: 10, //每页显示数据条数
        isCreateTimeAsc: 2, //是否按照创建时间升序排列,0:降序、1:升序、2:不使用
        isPriceAsc: 2,
        bookName: "",
        author: "",
        type: "",
        userName: "",
        priceRange: [0, 500],
      },
      tableData:[]
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    handleBookItemDetailClose() {
      if (localStorage.getItem('isbuy')=='1') {
        this.tableData.forEach((item, index) => {
          if (item == this.currentItem) {
            this.tableData.splice(index, 1)
          }
        })
        localStorage.setItem('isbuy',0)
        this.fetchBooks()//更新
      }
      this.dialogBookItemDetailVisible = false
    },
    handleOpenItemDialog(book){
      this.currentItem=book
      this.dialogBookItemDetailVisible=true
    },
    handleReset(){
      this.SearchKeyWord=''
      this.select=''
      this.typeSelect=''
      this.Pagi={
        currentPage: 1, //当前页码
        pagesize: 10, //每页显示数据条数
        isCreateTimeAsc: 2, //是否按照创建时间升序排列,0:降序、1:升序、2:不使用
        isPriceAsc: 2,
        bookName: "",
        author: "",
        type: "",
        userName: "",
        priceRange: [0, 500],
      }
    },
    handlePageChange(page) {
      this.Pagi.currentPage = page
    },
    ProcessTableData() {
      this.tableData.map((item) => {
        //格式化时间
        var strs = item.createTime.split("-");
        var str = strs[0] + "年" + strs[1] + "月" + strs[2];
        strs = str.split("T");
        str = strs[0] + "日" + strs[1];
        item.createTime = str;
        strs = item.updateTime.split("-");
        str = strs[0] + "年" + strs[1] + "月" + strs[2];
        strs = str.split("T");
        str = strs[0] + "日" + strs[1];
        item.updateTime = str;

        //书籍类型转中文
        switch (item.type) {
          case "Fiction":
            item.type = "小说";
            break;
          case "History":
            item.type = "历史";
            break;
          case "Biography":
            item.type = "传记";
            break;
          case "Science":
            item.type = "科普";
            break;
          case "Philosophy":
            item.type = "哲学";
            break;
          case "Religion":
            item.type = "宗教";
            break;
          case "TextBook":
            item.type = "教科书";
            break;
        }

        return item;
      });
    },
    handlePriceAscCommand(str) {
      if (str === "Asc") {
        this.$message("根据价格升序展示");
        this.Pagi.isPriceAsc = 1;
      } else if (str === "Desc") {
        this.$message("根据价格降序展示");
        this.Pagi.isPriceAsc = 0;
      } else {
        this.$message("已取消价格排序");
        this.Pagi.isPriceAsc = 2;
      }
    },
    handleCreateTimeAscCommand(str) {
      if (str === "Asc") {
        this.$message("根据发布时间升序展示");
        this.Pagi.isCreateTimeAsc = 1;
      } else if (str == "Desc") {
        this.$message("根据发布时间降序展示");
        this.Pagi.isCreateTimeAsc = 0;
      } else {
        this.$message("已取消发布时间排序");
        this.Pagi.isCreateTimeAsc = 2;
      }
    },
    async fetchBooks(newPagi){
      const response = await axios.get(`${this.BASE_URL}/books`, {
          headers: {
            token: this.token,
          },
          params: {
            isCreateTimeAsc: newPagi.isCreateTimeAsc,
            bookName: newPagi.bookName,
            author: newPagi.author,
            userName: newPagi.userName,
            bottomPrice: newPagi.priceRange[0],
            topPrice: newPagi.priceRange[1],
            type: newPagi.type,
            isPriceAsc: newPagi.isPriceAsc,
            page: newPagi.currentPage,
            pageSize: newPagi.pagesize,
          },
        });
        // console.log("newPagi:",newPagi)
        const result = response.data;
        if (result.code === 200) {
          console.log("请求成功", result.data);
          this.total = result.data.total;
          this.tableData = result.data.records;
          this.ProcessTableData();
        } else {
          console.log("请求失败", result.message);
        }
    }
  },
  watch: {
    typeSelect: {
      handler(newVal) {
        switch (newVal) {
          case "1":
            this.Pagi.type = "Fiction";
            break;
          case "2":
            this.Pagi.type = "Biography";
            break;
          case "3":
            this.Pagi.type = "History";
            break;
          case "4":
            this.Pagi.type = "TextBook";
            break;
          case "5":
            this.Pagi.type = "Science";
            break;
          case "6":
            this.Pagi.type = "Religion";
            break;
        }
      },
    },
    SearchKeyWord: {
      immediate: true,
      handler(newVal) {
        switch (this.select) {
          case "1":
            this.Pagi.bookName = newVal;
            break;
          case "2":
            this.Pagi.author = newVal;
            break;
          case "3":
            this.Pagi.userName = newVal;
            break;
        }
      },
    },
    Pagi: {
      deep: true,
      immediate: true,
      async handler(newPagi) {
        this.fetchBooks(newPagi)
      },
    },
  },
};
</script>

<style scoped>
.book-item {
  margin-bottom: 20px;
}

.book-info {
  display: flex;
  align-items: flex-start;
}

.book-image {
  margin-right: 20px;
}

.book-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.book-details {
  flex: 1;
}

.book-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.book-author,
.book-type,
.book-price,
.book-sold,
.book-create-time,
.book-update-time,
.book-description {
  font-size: 14px;
  margin-bottom: 5px;
}

.book-description {
  margin-top: 10px;
  color: #666;
}
</style>