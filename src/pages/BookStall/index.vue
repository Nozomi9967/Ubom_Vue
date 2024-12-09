<template>
  <div>
    <el-container >
      <el-header style="margin:0 auto">
        <div>
          <el-image style="width: 1200px; height: 400px"
            src="https://web-ubom.oss-cn-hangzhou.aliyuncs.com/book/platform/ab2690ae6d942f88e513162b96f4e3d.jpg"
            fit=scale-down></el-image>

        </div>
      </el-header>
      <el-container style="margin:300px 200px;margin-right: 260px">
        <el-aside style="margin-top: 100px;padding-left: 80px;width: 240px;">
          <div class="booksCount">
            <i class="el-icon-reading"></i>
            <span style="color: rgb(102, 102, 102);margin-left:13px">{{ booksCount }}种图书</span>
          </div>
          <div class="usersCount">
            <i class="el-icon-user"></i>
            <span style="color: rgb(102, 102, 102);margin-left:13px">{{ usersCount }}位用户</span>
          </div>
          <div style="margin-top: 100px">
            <h3>书摊人气榜</h3>
            <el-divider></el-divider>
            <ul>
              <li v-for="(item,index) in soldInfo" :key="index"><span style="margin-right: 10px;">{{ index+1 }}.</span>{{ item[0] }}</li>
            </ul>
          </div>
        </el-aside>
        <el-divider direction="vertical" class="dividerHeight"></el-divider>
        <el-main class="bookShow" >

          <!-- 教科书展示区 -->
          <div class="textBook">
            <span class="divisionName">教科书</span><el-divider></el-divider>
            <el-row v-for="(row, RowIndex) in getTextBooks" :key="RowIndex">
              <el-col :span="4" v-for="(item, ColIndex) in row" :key="ColIndex" class="centered-col">
                <div class="card-container">
                  <el-card :body-style="{ padding: '0px' }" style="width:150px;">
                    <img :src="item.image" class="image" style="width: 150px;height: 150px;">
                    <div style="padding: 14px;">
                      <span>{{ item.bookname }}</span>
                      <div class="bottom clearfix">
                        <span class="authorFont">{{ item.author }}</span>
                          
                      </div>
                    </div>
                  </el-card>
                  <span class="price-tag">￥{{ item.price }}</span>
                </div>
              </el-col>
            </el-row>
          </div>

          <!-- 历史书展示区 -->
          <div class="historyBook">
            <span class="divisionName">历史书</span><el-divider></el-divider>
            <el-row v-for="(row, RowIndex) in getHistoryBooks" :key="RowIndex">
              <el-col :span="4" v-for="(item, ColIndex) in row" :key="ColIndex" class="centered-col">
                <div class="card-container">
                  <el-card :body-style="{ padding: '0px' }" style="width:150px;">
                    <img :src="item.image" class="image" style="width: 150px;height: 150px;">
                    <div style="padding: 14px;">
                      <span>{{ item.bookname }}</span>
                      <div class="bottom clearfix">
                        <span class="authorFont">{{ item.author }}</span>
                          
                      </div>
                    </div>
                  </el-card>
                  <span class="price-tag">￥{{ item.price }}</span>
                </div>
              </el-col>
            </el-row>
          </div>

          <!-- 传记展示区 -->
          <div class="textBook">
            <span class="divisionName">传记</span><el-divider></el-divider>
            <el-row v-for="(row, RowIndex) in getBiographyBooks" :key="RowIndex">
              <el-col :span="4" v-for="(item, ColIndex) in row" :key="ColIndex" class="centered-col">
                <div class="card-container">
                  <el-card :body-style="{ padding: '0px' }" style="width:150px;">
                    <img :src="item.image" class="image" style="width: 150px;height: 150px;">
                    <div style="padding: 14px;">
                      <span>{{ item.bookname }}</span>
                      <div class="bottom clearfix">
                        <span class="authorFont">{{ item.author }}</span>
                          
                      </div>
                    </div>
                  </el-card>
                  <span class="price-tag">￥{{ item.price }}</span>
                </div>
              </el-col>
            </el-row>
          </div>

          <!-- 科普书展示区 -->
          <div class="textBook">
            <span class="divisionName">科普书</span><el-divider></el-divider>
            <el-row v-for="(row, RowIndex) in getScienceBooks" :key="RowIndex">
              <el-col :span="4" v-for="(item, ColIndex) in row" :key="ColIndex" class="centered-col">
                <div class="card-container">
                  <el-card :body-style="{ padding: '0px' }" style="width:150px;">
                    <img :src="item.image" class="image" style="width: 150px;height: 150px;">
                    <div style="padding: 14px;">
                      <span>{{ item.bookname }}</span>
                      <div class="bottom clearfix">
                        <span class="authorFont">{{ item.author }}</span>
                          
                      </div>
                    </div>
                  </el-card>
                  <span class="price-tag">￥{{ item.price }}</span>
                </div>
              </el-col>
            </el-row>
          </div>

          <!-- 宗教书展示区 -->
          <div class="textBook">
            <span class="divisionName">宗教书</span><el-divider></el-divider>
            <el-row v-for="(row, RowIndex) in getReligionBooks" :key="RowIndex">
              <el-col :span="4" v-for="(item, ColIndex) in row" :key="ColIndex" class="centered-col">
                <div class="card-container">
                  <el-card :body-style="{ padding: '0px' }" style="width:150px;">
                    <img :src="item.image" class="image" style="width: 150px;height: 150px;">
                    <div style="padding: 14px;">
                      <span>{{ item.bookname }}</span>
                      <div class="bottom clearfix">
                        <span class="authorFont">{{ item.author }}</span>
                          
                      </div>
                    </div>
                  </el-card>
                  <span class="price-tag">￥{{ item.price }}</span>
                </div>
              </el-col>
            </el-row>
          </div>

          <!-- 小说展示区 -->
          <div class="textBook">
            <span class="divisionName">小说</span><el-divider></el-divider>
            <el-row v-for="(row, RowIndex) in getFictionBooks" :key="RowIndex">
              <el-col :span="4" v-for="(item, ColIndex) in row" :key="ColIndex" class="centered-col">
                <div class="card-container">
                  <el-card :body-style="{ padding: '0px' }" style="width:150px;">
                    <img :src="item.image" class="image" style="width: 150px;height: 150px;">
                    <div style="padding: 14px;">
                      <span>{{ item.bookname }}</span>
                      <div class="bottom clearfix">
                        <span class="authorFont">{{ item.author }}</span>
                          
                      </div>
                    </div>
                  </el-card>
                  <span class="price-tag">￥{{ item.price }}</span>
                </div>
              </el-col>
            </el-row>
          </div>



        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'BookStall',
  data() {
    return {
      books: [],
      soldInfo:{},
      chunkSize: 6,
      booksCount:0,
      usersCount:0
    }
  },
  computed: {
    ...mapState(['token', 'userId', 'username']),

    //将十二个数据分为两个数组，一个数组六个，便于渲染
    getTextBooks() {
      if (!this.books || !this.books.textBooks) return []
      var result = []
      for (var i = 0; i < this.books.textBooks.length; i += this.chunkSize) {
        result.push(this.books.textBooks.slice(i, i + this.chunkSize))
      }
      return result
    },
    getHistoryBooks() {
      if (!this.books || !this.books.historyBooks) return []
      var result = []
      for (var i = 0; i < this.books.historyBooks.length; i += this.chunkSize) {
        result.push(this.books.historyBooks.slice(i, i + this.chunkSize))
      }
      return result
    },
    getReligionBooks() {
      if (!this.books || !this.books.religionBooks) return []
      var result = []
      for (var i = 0; i < this.books.religionBooks.length; i += this.chunkSize) {
        result.push(this.books.religionBooks.slice(i, i + this.chunkSize))
      }
      return result
    },
    getScienceBooks() {
      if (!this.books || !this.books.scienceBooks) return []
      var result = []
      for (var i = 0; i < this.books.scienceBooks.length; i += this.chunkSize) {
        result.push(this.books.scienceBooks.slice(i, i + this.chunkSize))
      }
      return result
    },
    getBiographyBooks() {
      if (!this.books || !this.books.biographyBooks) return []
      var result = []
      for (var i = 0; i < this.books.biographyBooks.length; i += this.chunkSize) {
        result.push(this.books.biographyBooks.slice(i, i + this.chunkSize))
      }
      return result
    },
    getFictionBooks() {
      if (!this.books || !this.books.fictionBooks) return []
      var result = []
      for (var i = 0; i < this.books.fictionBooks.length; i += this.chunkSize) {
        result.push(this.books.fictionBooks.slice(i, i + this.chunkSize))
      }
      return result
    }
  },
  async mounted() {
    console.log('BookStall mounted')
    this.$store.commit('LoadBaseInfo')//加载token等用户信息
    if (this.token) {//加载即将渲染的数据
      await this.fetchBooks()
      await this.fetchBooksAndUsersCount()
      await this.fetchSoldInfo()
      this.handleBooks()
      this.sortSoldInfo()
    }

  },
  methods: {
    sortSoldInfo() {
      if (!this.soldInfo)
        return false

      const map = new Map(Object.entries(this.soldInfo))
      const sortedMap = new Map([...map.entries()].sort((entryA, entryB) => {
        const valueA = entryA[1];
        const valueB = entryB[1];
        return -(valueA - valueB);
      }))
      // 键名映射对象
      const keyMapping = {
        biographySoldCount: "传记类书籍",
        fictionSoldCount: "小说类书籍",
        historySoldCount: "历史类书籍",
        textSoldCount: "文本类书籍",
        scienceSoldCount: "科学类书籍",
        religionSoldCount: "宗教类书籍"
      };

      // 创建一个新的 Map，包含转换后的键和原有的值
      const descriptiveMap = new Map(
        [...sortedMap].map(([key, value]) => [keyMapping[key] || "未知类别书籍", value])
      );
      this.soldInfo = descriptiveMap
    },
    async fetchSoldInfo(){
      await axios.get(`${this.BASE_URL}/books/sold`, {
        headers: {
          token: this.token
        }
      }).then(
        response => {
          if (response.data.code == 200) {
            console.log('fetchBooks请求成功', response.data)
            this.soldInfo = response.data.data
          } else {
            console.log('fetchBooks请求失败', response.data)
          }
        },
        error => {
          console.log('fetchBooks请求失败', error.message)
        }
      )
    },
    async fetchBooksAndUsersCount(){
      await axios.get(`${this.BASE_URL}/books/count`,{
        headers:{
          token:this.token
        }
      }).then(
        response=>{
          if (response.data.code == 200) {
            console.log('fetchBooksAndUsersCount请求成功', response.data)
            this.booksCount=response.data.data
          } else {
            console.log('fetchBooksAndUsersCount请求失败', response.data)
          }
        }
      ).catch(
        error => {
          console.log('fetchBooksAndUsersCount请求失败', error.message)
        }
      )

      await axios.get(`${this.BASE_URL}/users/count`,{
        headers:{
          token:this.token
        }
      }).then(
        response=>{
          if (response.data.code == 200) {
            console.log('fetchBooksAndUsersCount请求成功', response.data)
            this.usersCount=response.data.data
          } else {
            console.log('fetchBooksAndUsersCount请求失败', response.data)
          }
        }
      ).catch(
        error => {
          console.log('fetchBooksAndUsersCount请求失败', error.message)
        }
      )
    },
    async fetchBooks() {
      await axios.get(`${this.BASE_URL}/bookstall`, {
        headers: {
          token: this.token
        }
      }).then(
        response => {
          if (response.data.code == 200) {
            console.log('fetchBooks请求成功', response.data)
            this.books = response.data.data
          } else {
            console.log('fetchBooks请求失败', response.data)
          }
        },
        error => {
          console.log('fetchBooks请求失败', error.message)
        }
      )
    },
    //对接受的数据进行加工
    handleBooks() {
      if (!this.books)
        return false

      // 创建 temBooks 对象，确保从 this.books 中提取的每个属性都是数组
      var temBooks = {
        'biography': Array.from(this.books.biographyBooks || []),
        'fiction': Array.from(this.books.fictionBooks || []),
        'history': Array.from(this.books.historyBooks || []),
        'religion': Array.from(this.books.religionBooks || []),
        'science': Array.from(this.books.scienceBooks || []),
        'textbook': Array.from(this.books.textBooks || [])
      };

      console.log(temBooks);

      // 类型映射
      const typeMapping = {
        'biography': '传记',
        'fiction': '小说',
        'history': '历史',
        'religion': '宗教',
        'science': '科普',
        'textbook': '教科书'
      };

      // 遍历 temBooks 并设置每本书的类型
      for (let [key, bookList] of Object.entries(temBooks)) {
        const type = typeMapping[key] || '未知类型'; // 确定类型
        bookList.forEach(book => {
          book.type = type; // 设置类型
        });
      }

      console.log(temBooks); // 打印处理后的 temBooks




      // if()
      // //格式化时间
      // var strs = item.createTime.split('-')
      // var str = strs[0] + '年' + strs[1] + '月' + strs[2]
      // strs = str.split('T')
      // str = strs[0] + '日' + strs[1]
      // item.createTime = str
      // strs = item.updateTime.split('-')
      // str = strs[0] + '年' + strs[1] + '月' + strs[2]
      // strs = str.split('T')
      // str = strs[0] + '日' + strs[1]
      // item.updateTime = str
    }
  }
}
</script>

<style scoped>

ul {
  list-style-type: none; /* 移除默认标记 */
}

ul li{
  font-size: 12px;
  font-weight: bold
}

ul li:nth-child(-n+3){
  color: rgb(134, 36, 46);

}

.dividerHeight{
  height: 3703px !important;
}

.authorFont {
  font-size: 12px;
  color: rgb(143, 159, 180)
}

.centered-col {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* 确保 el-col 高度适应父容器 */
}

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* 确保文本居中 */
}

.el-card {
  margin-bottom: 8px;
  /* 给价格标签留出空间 */
}

.price-tag {
  display: block;
  width: 100%;
  font-size: 14px;
  color: #bf7f5f;
  text-align: center;
  /* 确保价格文本居中 */
}

.divisionName {
  font-size: 30px;
}

.bookShow .el-card {
  margin: 10px;
}

.bookShow>div {
  margin-top: 30px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>