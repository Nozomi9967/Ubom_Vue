<template>
  <div id="app">
    <Header 
    :avatar="avatar" 
    :balance="balance" 
    @update:balance="balance = $event" 
    :shopCart="shopCart"
    @refresh="handleRefresh"></Header>
    <router-view :key="refreshKey"></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
export default {
  name: "App",
  data(){
    return {
      refreshKey:0
    }
  },
  components: {
    Header
  },
  methods: {
    handleRefresh(){
      this.refreshKey+=1
    }
  },
  computed: {
    avatar(){
      return this.$store.state.avatar
    },
    balance(){
      return this.$store.state.balance
    },
    shopCart(){
      return this.$store.state.shopCart
    }
  }
}
</script>

<style scoped></style>
