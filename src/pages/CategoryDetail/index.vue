<template>
  <div>
    <el-container style="margin-left: 100px;margin-right: 100px;">
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo" @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">小说</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">传记</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">历史</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">宗教</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">教材</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-menu"></i>
            <span slot="title">哲学</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-menu"></i>
            <span slot="title">科普</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>{{ getCategoryName }}</el-header>
        <el-main>
          <div class="grid-container">
            <el-card v-for="(item, index) in books" :key="index" class="grid-item"
              @click.native="handleClickBookItem(item)">
              <img :src="item.image" class="image" style="width: 150px;height: 150px;">
              <div style="padding: 14px;">
                <span>{{ item.bookname }}</span>
                <div class="bottom clearfix">
                  <span class="authorFont">{{ item.author }}</span>
                </div>
              </div>
            </el-card>
          </div>
        </el-main>
        <el-footer>
          <el-pagination background layout="prev, pager, next" :page-count="Pagi.pages" :page-size="Pagi.PageSize"
            :current-page="Pagi.curPageNum" @current-change="handlePageChange">
          </el-pagination>
        </el-footer>
      </el-container>
    </el-container>

    <BookItemDetail :visible="dialogBookItemDetailVisible" :currentItem="currentItem" @close="dialogBookItemDetailVisible=false"/>

  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import BookItemDetail from '@/components/BookItemDetail.vue';
export default {
  name: 'CategoryDetail',
  components: { BookItemDetail },
  data() {
    return {
      curCategory: '',
      books: [],
      dialogBookItemDetailVisible:false,
      currentItem:{},
      categoryMapping: {
        1: 'fiction',
        2: 'biography',
        3: 'history',
        4: 'religion',
        5: 'textbook',
        6: 'philosophy',
        7: 'science'
      },
      Pagi: {
        curPageNum: 1,
        PageSize: 12,
        pages: 0
      }
    }
  },
  computed: {
    ...mapState(['token']),
    getCategoryName() {
      switch (this.curCategory[0]) {
        case 'f':
          return "小说"; // Fiction -> 小说
        case 'b':
          return "传记"; // Biography -> 传记
        case 'h':
          return "历史"; // History -> 历史
        case 'r':
          return "宗教"; // Religion -> 宗教
        case 't':
          return "教材"; // TextBook -> 教材
        case 'p':
          return "哲学"; // Philosophy -> 哲学
        case 's':
          return "科普书"; // Science -> 科普书
      }
    }
  },
  watch: {
    'curCategory': {
      handler() {
        if (this.curCategory)
          this.fetchCategoryBooks()
      }
    },
    'Pagi': {
      deep: true,
      immediate: true,
      handler() {
        if (this.curCategory) {
          this.fetchCategoryBooks()
        }
      }
    }
  },
  mounted() {
    this.curCategory = this.$route.params.index
    // console.log(this.curCategory)
    // this.fetchCategoryBooks()
    // this.handlePageChange()
  },
  methods: {
    handleClickBookItem(item){
      console.log(item.bookname)
      this.currentItem=item
    },
    handleSelect(index) {
      // 根据index设置curCategory为对应的英文值
      this.curCategory = this.categoryMapping[index];
      // 更新页面以反映新选择的类别
      this.Pagi.curPageNum = 1; // 可能需要重置页码
    },
    handlePageChange(page) {
      this.Pagi.curPageNum = page
    },
    async fetchCategoryBooks() {
      await axios.get(`${this.BASE_URL}/books/kind`, {
        params: {
          kind: this.curCategory,
          pageSize: this.Pagi.PageSize,
          pageNum: this.Pagi.curPageNum
        },
        headers: {
          token: this.token
        }
      }).then(
        response => {
          const result = response.data
          if (result.code == 200) {
            console.log('fetchCategoryBooks请求成功')
            // console.log(result.data)
            this.books = result.data.records
            this.Pagi.pages = result.data.pages
          } else {
            console.log('fetchCategoryBooks请求失败')
          }
        }
      ).catch(
        error => {
          console.log('fetchCategoryBooks请求失败')
          console.log(error.message)
        }
      )
    }
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  /* 6列 */
  grid-template-rows: repeat(6, auto);
  /* 6行 */
  gap: 10px;
  /* 列和行的间距 */
}

.grid-item {
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
}
</style>