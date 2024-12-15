<template>
  <div id="app">
    <Header :avatar="avatar" :balance="balance" :shopCart="shopCart"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
export default {
  name: "App",
  data(){
    return {
      
    }
  },
  components: {
    Header
  },
  methods: {
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
