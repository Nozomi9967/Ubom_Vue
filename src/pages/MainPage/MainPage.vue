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
  },
  methods: {
  }
}
</script>

<style scoped>
.mainpage {
  margin-top: 100px;
}
</style>