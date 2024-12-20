<template>
  <div class="mainpage">
    <el-container style="margin-left: 230px; margin-right: 230px">
      <el-header style="height: 110px; margin-top: 0">
        <el-image
          style="width: 800px; height: 110px"
          :src="require('@/pages/MainPage/images/title.png')"
          fit="contain"
        ></el-image>
      </el-header>
      <el-divider></el-divider>
      <el-main>
        <span style="font-size: 30px; font-weight: bold">好书推荐</span>
        <el-carousel
          height="270px"
          style="width: 1010px; margin-left: 80px; margin-right: 50px"
          direction="vertical"
          :autoplay="false"
        >
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="medium"></h3>
          </el-carousel-item>
        </el-carousel>
        <div class="book-grid">
          <div
            v-for="(book, index) in newRecomBooks"
            :key="index"
            class="book-item"
          >
            <el-card
              :body-style="{ padding: '10px' }"
              @click.native="handleClickBookItem(book)"
            >
              <img :src="book.image" class="book-cover" alt="Book Cover" />
              <div style="padding: 14px">
                <span>{{ book.bookname }}</span
                ><br />
                <span>{{ book.author }}</span>
              </div>
            </el-card>
          </div>
        </div>
      </el-main>
      <BookItemDetail
        :visible="dialogBookItemDetailVisible"
        :currentItem="currentItem"
        @close="handleBookItemDetailClose"
      />
    </el-container>
  </div>
</template>

<script>
import BookItemDetail from "@/components/BookItemDetail.vue";
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "MainPage",
  components: {
    BookItemDetail,
  },
  data() {
    return {
      SearchKeyWord: "",
      recomBooks: [],
      currentItem: {},
      dialogBookItemDetailVisible: false,
      newRecomBooks:[]
    };
  },
  computed: {
    ...mapState(["token", "userId", "username"]),
  },
  mounted() {
    console.log("MainPage mounted");
    this.$store.commit("LoadBaseInfo");
    this.fetchGoodBooks();
  },
  methods: {
    //对接受的数据进行加工
    handleBooks() {
      if (!this.recomBooks) return false;

      const typeMapping = {
        biography: "传记",
        fiction: "小说",
        history: "历史",
        religion: "宗教",
        science: "科普",
        textbook: "教科书",
      };

      this.newRecomBooks = Object.entries(this.recomBooks).map(([key, item]) => {
        const type = typeMapping[key] || "未知类型";
        const newItem = { ...item, type };

        let strs = newItem.createTime.split("-");
        let str = strs[0] + "年" + strs[1] + "月" + strs[2];
        strs = str.split("T");
        str = strs[0] + "日" + strs[1];
        newItem.createTime = str;


        return newItem;
      })

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
    },
    handleBookItemDetailClose() {
      if (localStorage.getItem("isbuy") == "1") {
        this.recomBooks.forEach((item, index) => {
          if (item == this.currentItem) {
            this.recomBooks.splice(index, 1);
          }
        });
        localStorage.setItem("isbuy", 0);
        this.fetchGoodBooks(); //更新
      }
      this.dialogBookItemDetailVisible = false;
    },
    handleClickBookItem(book) {
      console.log(book.bookname);
      this.currentItem = book;
      this.dialogBookItemDetailVisible = true;
    },
    async fetchGoodBooks() {
      await axios
        .get(`${this.BASE_URL}/books/recommend`, {
          headers: {
            token: this.token,
          },
        })
        .then((response) => {
          const result = response.data;
          if (result.code == 200) {
            console.log("fetchGoodBooks请求成功");
            console.log(result);
            this.recomBooks = result.data;
            this.handleBooks()
          } else {
            console.log("fetchGoodBooks请求失败");
          }
        })
        .catch((error) => {
          console.log("fetchGoodBooks请求失败");
          console.log(error.message);
        });
    },
  },
};
</script>

<style scoped>
.book-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 创建6列 */
  gap: 15px; /* 列之间的间距 */
}

.book-item {
  margin-bottom: 15px; /* 行之间的间距 */
}

.book-cover {
  width: 100%;
  height: auto;
}

/* 确保卡片样式适应网格 */
.el-card {
  width: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(1) {
  background-image: url("@/pages/MainPage/images/1.png");
}

.el-carousel__item:nth-child(2) {
  background-image: url("@/pages/MainPage/images/2.png");
}

.el-carousel__item:nth-child(3) {
  background-image: url("@/pages/MainPage/images/3.png");
}

.el-carousel__item:nth-child(4) {
  background-image: url("@/pages/MainPage/images/4.png");
}
</style>