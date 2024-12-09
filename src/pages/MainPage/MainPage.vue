<template>
  <div class="mainpage">
    <el-container>
      <el-header>
        
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'MainPage',
  data() {
    return {
      booksObj: null,
      // bookList:[],
      currentPage: 1
    }
  },
  computed: {
    ...mapState(['token', 'userId', 'username']),
  },
  mounted() {
    console.log('MainPage mounted')
    this.$store.commit('LoadBaseInfo')
    if (this.token)
      this.fetchBooks()
  },
  methods: {
    
    async fetchBooks() {
      await axios.get('http://localhost:8080/books', {
        headers: {
          token: this.token
        }
      }).then(
        response => {
          console.log('请求成功', response.data)
          this.booksObj = response.data.data
          // this.bookList=booksObj.records
        },
        error => {
          console.log('请求失败', error.message)
        }
      )
    }
  }
}
</script>

<style scoped>
.mainpage {
  margin-top: 100px;
}
</style>